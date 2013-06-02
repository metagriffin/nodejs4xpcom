// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/04
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

// TODO: when running in non-async mode, n4x should raise an exception
//       if err != null...

EXPORTED_SYMBOLS = ['nodejs'];
Components.utils.import("resource:///modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

//-----------------------------------------------------------------------------
const console = {
  log: function(msg) {
    try{ dump(msg + '\n'); }catch(e){}
    try{ Components.classes["@mozilla.org/consoleservice;1"]
         .getService(Components.interfaces.nsIConsoleService).logStringMessage(msg);
       }catch(e){}
  },
  dir: function(obj) {
    try{
      let out = '{';
      for ( let key in obj )
        out += key + ': ' + obj[key] + ', ';
      out += '}';
      console.log(out);
    }catch(e){}
  }
};

//-----------------------------------------------------------------------------
let nodejs = {
  console: console,
  get syslib() {
    return __LOCATION__.parent.parent.path + '/nodejs_modules';
  }
};

//-----------------------------------------------------------------------------
// todo: getApi needs to be improved to cleanup after shutdown, the way
//       that generateServiceAccessor does in
//         resource://calendar/modules/calUtils.jsm
function getApi(id, iface)
{
  if ( ! iface )
  {
    iface = id;
    switch ( iface )
    {
      case Components.interfaces.nsIFileInputStream:
        id = '@mozilla.org/network/file-input-stream;1'; break;
      case Components.interfaces.nsIScriptableInputStream:
        id = '@mozilla.org/scriptableinputstream;1'; break;
      case Components.interfaces.nsIIOService2:
        id = '@mozilla.org/network/io-service;1'; break;
      case Components.interfaces.nsILocalFile:
        id = '@mozilla.org/file/local;1'; break;
      case Components.interfaces.mozIJSSubScriptLoader:
        id = '@mozilla.org/moz/jssubscript-loader;1'; break;
      case Components.interfaces.nsITimer:
        id = '@mozilla.org/timer;1'; break;
      default:
        throw 'Unknown interface requested for `getApi`: ' + iface;
    }
  }
  return Components.classes[id].createInstance(iface);
}

//-----------------------------------------------------------------------------
let cache = {modules: {}, scripts: {}};

//-----------------------------------------------------------------------------
function _find_libdir(path) {
  let trypath = path.clone();
  trypath.appendRelativePath('node_modules')
  if ( trypath.exists() && trypath.isDirectory() )
    return trypath.path;
  if ( ! path.parent )
    return null;
  return _find_libdir(path.parent);
}

//-----------------------------------------------------------------------------
function make_libdirs(path) {
  let libdir = _find_libdir(path);
  if ( ! libdir )
    // todo: is there a more appropriate "default" 
    libdir = path.parent.path;
  return [libdir, nodejs.syslib];
}

//-----------------------------------------------------------------------------
function extend() {
  let ret = arguments.length > 0 ? arguments[0] : {};
  if ( ! ret )
    ret = {};
  for ( let idx=0 ; idx<arguments.length ; idx++ )
  {
    let item = arguments[idx];
    for ( let key in item )
      ret[key] = item[key];
  }
  return ret;
}

//-----------------------------------------------------------------------------
function listconcat() {
  let ret = [];
  for ( let idx=0 ; idx<arguments.length ; idx++ )
  {
    let array = arguments[idx];
    if ( ! array || ! array.length )
      continue;
    for ( let subidx=0 ; subidx<array.length ; subidx++ )
      ret.push(array[subidx]);
  }
  return ret;
};

//-----------------------------------------------------------------------------
nodejs.setTimeout = function(callback, time) {
  // console.log('CALLED: nodejs.setTimeout');
  var timer = getApi(Components.interfaces.nsITimer);
  var event = {notify: callback};
  timer.initWithCallback(event, time, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  return timer;
}

//-----------------------------------------------------------------------------
nodejs.clearTimeout = function(timer) {
  // console.log('CALLED: nodejs.clearTimeout');
  timer.cancel();
}

//-----------------------------------------------------------------------------
nodejs.setInterval = function(callback, time) {
  // console.log('CALLED: nodejs.setInterval');
  var timer = getApi(Components.interfaces.nsITimer);
  var event = {observe: callback};
  timer.init(event, time, Components.interfaces.nsITimer.TYPE_REPEATING_PRECISE_CAN_SKIP);
  return timer;
}

//-----------------------------------------------------------------------------
nodejs.clearInterval = function(timer) {
  // console.log('CALLED: nodejs.clearInterval');
  timer.cancel();
}

//-----------------------------------------------------------------------------
nodejs.make_require = function(curpath, options) // libdirs, indent
{
  options = extend({}, {
    libdirs: null,
    predirs: null,
    indent:  '  '
  }, options);
  if ( typeof(curpath) != 'string' )
  {
    if ( ! options.libdirs )
      options.libdirs = make_libdirs(curpath);
    curpath = curpath.path;
  }
  let define  = nodejs.make_define(curpath, extend({}, options, {
    scope:  {},
    async:  false,
    indent: options.indent + '  '
  }));
  let require = function(lib) {
    // console.log('[n4x] REQUIRE: ' + lib + ' (from "' + curpath + '")');
    // console.log('AMD.R' + indent + lib);
    try{
      let ret = null;
      define(null, [lib], function(dlib) {
        ret = dlib;
      });
      return ret;
    }catch(e){
      console.log('[**] REQUIRE FAILED of ' + lib + ' (from "' + curpath + '"):');
      console.log(e);
      throw e;
    };
  };
  return require;
}

//-----------------------------------------------------------------------------
function readFile(fileObject, async, cb)
{
  // console.log('===> readFile(' + fileObject.path + ', '
  //             + ( async ? 'async' : 'sync' )
  //             + ')');
  if ( async )
  {
    NetUtil.asyncFetch(fileObject, function(inputStream, status) {
      if ( ! Components.isSuccessCode(status) ) {
        console.log('[**] ERROR: failed reading file "' + fileObject.path + '": ' + status);
        return cb('failed reading file: ' + fileObject.path);
      }
      let data = NetUtil.readInputStreamToString(inputStream, inputStream.available());
      return cb(null, data);
    });
    return;
  }
  try
  {
    let data     = new String();
    let fiStream = getApi(Components.interfaces.nsIFileInputStream);
    let siStream = getApi(Components.interfaces.nsIScriptableInputStream);
    fiStream.init(fileObject, 1, 0, false);
    siStream.init(fiStream);
    data += siStream.read(-1);
    siStream.close();
    fiStream.close();
    return cb(null, data);
  } catch(e) {
    console.log('[**] ERROR: failed reading file "' + fileObject.path + '": ' + e);
    return cb('[**] failed reading file "' + fileObject.path + '": ' + e);
  }
}

//-----------------------------------------------------------------------------
nodejs.make_define = function(curpath, options) // libdirs, scope, async, indent)
{
  options = extend({}, {
    libdirs: null,
    predirs: null,
    scope:   null,
    globals: null,
    async:   null,
    indent:  '  '
  }, options);
  if ( typeof(curpath) != 'string' )
  {
    if ( ! options.libdirs )
      options.libdirs = make_libdirs(curpath);
    curpath = curpath.path;
  }

  //---------------------------------------------------------------------------
  let _loadScript = function(path, curlibdirs, curpredirs, cb) {
    // console.log('loading script: "' + path + '" with libdirs "' + curlibdirs + '"');

    let scriptLoader = getApi(Components.interfaces.mozIJSSubScriptLoader);
    let ioService = getApi(Components.interfaces.nsIIOService2);
    let file = getApi(Components.interfaces.nsILocalFile);
    file.initWithPath(path);
    let spec = ioService.newFileURI(file).spec;

    let wait   = false;
    let scope  = extend({}, options.globals);
    let done   = function(err) {
      if ( err )
        return cb(err);
      let retscope = {};
      for ( let key in scope )
        retscope[key] = scope[key];
      for ( let key in scope.exports )
        retscope[key] = scope.exports[key];
      if ( typeof(scope.module.exports) == 'function' )
        retscope = scope.module.exports;
      else
        for ( let key in scope.module.exports )
          retscope[key] = scope.module.exports[key];
      delete scope.console;
      delete scope.require;
      delete scope.exports;
      delete scope.define;
      return cb(null, retscope);
    };
    let curdef = nodejs.make_define(path, extend({}, options, {
      libdirs: curlibdirs,
      predirs: curpredirs,
      scope:   scope,
      indent:  options.indent + '  '
    }));

    scope.__filename = path;
    scope.__dirname  = file.parent.path;
    scope.process    = {env: {}};

    // TODO: support the other global objects as well:
    //   - global
    //   - process
    //   - console
    //   - Class: Buffer
    //   - require()
    //   - require.resolve()
    //   -     require.cache
    //   -     require.extensions
    //   - __filename
    //   - __dirname
    //   - module
    //   - exports
    // and from `timers`:
    //   - setTimeout(cb, ms)
    //   - clearTimeout(t)
    //   - setInterval(cb, ms)
    //   - clearInterval(t)

    // <TODO> added for jasmine-node... is there a better way???
    // TODO: these should only be set conditionally...
    // TODO: not sure why i need to set these... i thought `scope`
    //       *was* the global object...
    if ( ! this.setTimeout || ! this.clearTimeout || ! this.setInterval || ! this.clearInterval )
    {
      this.setTimeout    = scope.setTimeout    = nodejs.setTimeout;
      this.clearTimeout  = scope.clearTimeout  = nodejs.clearTimeout;
      this.setInterval   = scope.setInterval   = nodejs.setInterval;
      this.clearInterval = scope.clearInterval = nodejs.clearInterval;
    }
    // </TODO>

    scope.console    = console;
    scope.exports    = {};
    scope.module     = {exports: {}};
    scope.require    = nodejs.make_require(path, extend({}, options, {
      libdirs: curlibdirs,
      predirs: curpredirs,
      scope:   null,
      indent:  options.indent + '  '
    }));
    scope.define     = function() {
      if ( wait )
        // only support one `define` call per script
        return cb('multiple calls to "define" in script: ' + path);
      wait = true;
      let args = [];
      for ( let idx=0 ; idx<arguments.length ; idx++ )
        args.push(arguments[idx]);
      args.push(done);
      curdef.apply(null, args);
    };

    try {
      // todo: probably want to switch to Components.utils.import, see:
      //         https://developer.mozilla.org/en-US/docs/Components.utils.import
      scriptLoader.loadSubScript(spec, scope, 'UTF-8');
      if ( ! wait )
        return done();
      return;
    } catch (exc) {
      console.log('[**] failed loading "' + path + '": ' + exc);
      Components.utils.reportError(exc + ' (' + spec + ')');
      throw exc;
    }
  };

  //---------------------------------------------------------------------------
  let _cacheScript = function(path, curlibdirs, curpredirs, cb) {
    // todo: collapse '../DIR' to '.' first...
    path = path.replace(/\/\.\//g, '/');
    // todo: global script caching seems like a bad idea...
    if ( cache.scripts[path] )
    {
      // console.log('[  ] returning cached script: ' + path);
      return cb(null, cache.scripts[path]);
    }
    // console.log('[  ] loading cacheable script: ' + path);
    return _loadScript(path, curlibdirs, curpredirs, function(err, ret) {
      if ( err )
        return cb(err);
      if ( ! cache.scripts[path] )
        cache.scripts[path] = ret;
      return cb(null, ret);
    });
  };

  //---------------------------------------------------------------------------
  let loadScript = function(path, curlibdirs, curpredirs, cb) {
    let file = getApi(Components.interfaces.nsILocalFile);
    file.initWithPath(path);
    if ( file.exists() && file.isDirectory() )
    {
      let idxfile = file.clone();
      idxfile.appendRelativePath('index.js');
      if ( idxfile.exists() ) // && idxfile.isFile() )
        return _cacheScript(path + '/index.js', curlibdirs, curpredirs, cb);
    }
    if ( ! path.match(/\.(js|jsm)$/) )
      path += '.js';
    return _cacheScript(path, curlibdirs, curpredirs, cb);
  };

  //---------------------------------------------------------------------------
  let loadDependency = function(lib, cb) {
    try{
      // console.log('AMD.L' + indent + lib + ': loading...');
      _loadDependency(lib, function(err, mod) {
        if ( err )
        {
          console.log('AMD.L' + options.indent + lib + ': error ' + err);
          return cb(err);
        }
        // console.log('AMD.L' + options.indent + lib + ': ok');
        return cb(null, mod);
      });
    }catch(e){
      console.log('AMD.L' + options.indent + lib + ': exception ' + e);
      throw e;
    }
  };

  //---------------------------------------------------------------------------
  let _loadDependency = function(lib, cb) {

    // if ( systemModules[lib] )
    // {
    //   // console.log('[==] WARNING ============> returning fake node lib: ' + lib);
    //   return cb(null, systemModules[lib]);
    // }

    if ( lib.match(/^[.\/]/) )
    {
      // relative import - don't do package lookups
      let file = getApi(Components.interfaces.nsILocalFile);
      file.initWithPath(curpath);
      file = file.parent;
      file.appendRelativePath(lib);
      return loadScript(file.path, options.libdirs, options.predirs, cb);
    }
    if ( cache.modules[lib] )
    {
      // console.log('[  ] returning cached module: ' + lib);
      return cb(null, cache.modules[lib]);
    }
    let handled = false;
    let pkgfiles = [
      'node_modules/' + lib + '/package.json',
      lib + '/package.json'
    ];
    let deplibdirs = listconcat(options.predirs, options.libdirs);
    for ( let lidx=0 ; lidx<deplibdirs.length ; lidx++ )
    {
      for ( let pidx=0 ; pidx<pkgfiles.length ; pidx++ )
      {
        if ( handled )
          return;
        // try node-style includes: read the "package.json" => "main"
        // TODO: go through a whole cascading of attempts if package.json
        //       does not exist or does not define a "main"...
        let file = getApi(Components.interfaces.nsILocalFile);
        file.initWithPath(deplibdirs[lidx]);
        file.appendRelativePath(pkgfiles[pidx]);
        if ( ! file.exists() )
        {
          // console.log('trying "' + file.path + '": no such file');
          continue;
        }
        handled = true;
        // console.log('trying "' + file.path + '": found - loading');
        // console.log('  - ' + ( async ? 'a' : '' ) + 'synchronously loading package definition: '
        //         + file.path);
        // TODO: make this work asynchronously as well...
        // readFile(file, async, function(err, data) {
        readFile(file, false, function(err, data) {
          if ( err )
            return cb(err);
          try{
            data = JSON.parse(data);
          }catch(e){
            return cb('invalid JSON in package definition: ' + file.path);
          }
          if ( ! data || ! data.main )
            return cb('no "main" attribute in package definition: ' + file.path);
          let mainfile = file.parent.clone();
          mainfile.appendRelativePath(data.main);
          let pkglibdirs = options.libdirs.slice(0);
          pkglibdirs.unshift(file.parent.path);
          return loadScript(mainfile.path, pkglibdirs, options.predirs, function(err, mod) {
            if ( err )
              return cb(err);
            if ( ! cache.modules[lib] )
              cache.modules[lib] = mod;
            return cb(null, mod);
          });
        });
      }
    }
    if ( handled )
      return;
    return cb('could not find package definition for dependency "' + lib + '"');
  }

  //---------------------------------------------------------------------------
  let define = function(id, deps, factory, cb)
  {
    if ( Array.isArray(id) )
    {
      cb      = factory;
      factory = deps;
      deps    = id;
      id      = undefined;
    }

    // console.log('AMD.D' + options.indent + JSON.stringify(deps));

    if ( ! cb )
      cb = function(){};

    let libs = [];
    let done = false;
    let runfactory = function() {
      let lib = factory.apply(null, libs);
      for ( let key in lib )
        options.scope[key] = lib[key];
      return cb();
    };
    let rundone = function(err, mod, depidx) {
      if ( done )
        return;
      if ( err )
      {
        done = true;
        return cb(err);
      }
      libs[depidx] = mod;
      for ( let idx=0 ; idx<deps.length ; idx++ )
        if ( ! libs[idx] )
          return;
      done = true;
      runfactory();
    };
    let rundep = function(dep, depidx) {
      loadDependency(dep, function(err, mod) {
        if ( err )
        {
          console.log('[**] error loading dependency "' + dep + '": ' + err);
          Components.utils.reportError('could not load dependency: ' + dep);
          return rundone(err, null, depidx);
        }
        return rundone(null, mod, depidx);
      });
    };
    if ( deps.length <= 0 )
      return runfactory();
    try
    {
      for ( let idx=0 ; idx<deps.length ; idx++ )
      {
        if ( done )
          continue;
        rundep(deps[idx], idx);
      }
    } catch(e) {
      console.log('[**] failed loading dependencies: ' + e);
      return cb('failed loading dependencies: ' + e);
    }
  }

  return define;
}

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
