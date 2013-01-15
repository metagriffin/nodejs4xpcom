// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/04
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// TODO: this module is *CRAZY*...
//-----------------------------------------------------------------------------

Components.utils.import("resource:///modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

// todo: remove this... (it's only being used for cal.LOG...)
Components.utils.import("resource://calendar/modules/calUtils.jsm");

EXPORTED_SYMBOLS = ['nodejs'];

//-----------------------------------------------------------------------------
const console = (function() {
  const tempScope = {};
  Components.utils.import("resource://gre/modules/devtools/Console.jsm", tempScope);
  return tempScope.console;
})();

// TODO: for some silly reason, the gre's console.log truncates lines
//       to 80 characters... so, working around that.
console._log = console.log;
console.log = function(msg) {
  cal.LOG(msg);
  // if ( ! msg || ! msg.length || msg.length <= 80 || msg.charAt(79) == '\\' )
  //   return console._log(msg);
  // console._log(msg.substr(0, 79) + '\\');
  // console.log('  ' + msg.substr(79));
};

//-----------------------------------------------------------------------------
// this is just for shits-and-giggles
let nodejs = {
  console: console
};

//-----------------------------------------------------------------------------
// todo: getApi needs to be improved to cleanup after shutdown, the way
//       that generateServiceAccessor does in
//         resource://calendar/modules/calUtils.jsm
function getApi(id, iface)
{
  if ( ! iface )
  {
    // accounting for this *idiotic* interface "creation"...
    iface = id;
    if ( iface === Components.interfaces.nsIFileInputStream )
      id = '@mozilla.org/network/file-input-stream;1';
    else if ( iface === Components.interfaces.nsIScriptableInputStream)
      id = '@mozilla.org/scriptableinputstream;1';
    else if ( iface === Components.interfaces.nsIIOService2 )
      id = '@mozilla.org/network/io-service;1';
    else if ( iface === Components.interfaces.nsILocalFile )
      id = '@mozilla.org/file/local;1';
    else if ( iface === Components.interfaces.mozIJSSubScriptLoader )
      id = '@mozilla.org/moz/jssubscript-loader;1';
  }
  return Components.classes[id].createInstance(iface);
}

//-----------------------------------------------------------------------------
let cacheModules = {};

//-----------------------------------------------------------------------------
function injectCompatibilityModules(libdirs) {
  if ( libdirs[libdirs.length - 1].match(/\/nodejs_modules$/) )
    return libdirs;
  let ret = libdirs.slice(0);
  ret.push(__LOCATION__.parent.parent.path + '/nodejs_modules');
  return ret;
}

//-----------------------------------------------------------------------------
nodejs.make_require = function(curpath, libdirs, indent)
{
  if ( ! indent )
    indent = '  ';
  libdirs = injectCompatibilityModules(libdirs);
  let scope   = {};
  let define  = nodejs.make_define(curpath, libdirs, scope, false, indent + '  ');
  let require = function(lib) {
    // console.log('[n4x] REQUIRE: ' + lib + ' (from "' + curpath + '")');
    // console.log('AMD.R' + indent + lib);
    try{
      let ret = null;
      define(null, [lib], function(dlib) {
        // console.log('  POST-DEFINE[' + lib + ']: ' + dlib);
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
nodejs.make_define = function(curpath, libdirs, scope, async, indent)
{
  if ( ! indent )
    indent = '  ';
  libdirs = injectCompatibilityModules(libdirs);

  //---------------------------------------------------------------------------
  let _loadScript = function(path, curlibdirs, cb) {
    // console.log('loading script: "' + path + '" with libdirs "' + curlibdirs + '"');

    let scriptLoader = getApi(Components.interfaces.mozIJSSubScriptLoader);
    let ioService = getApi(Components.interfaces.nsIIOService2);
    let file = getApi(Components.interfaces.nsILocalFile);
    file.initWithPath(path);
    let spec = ioService.newFileURI(file).spec;

    let wait   = false;
    let scope  = {};
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
    let curdef = nodejs.make_define(path, curlibdirs, scope, async, indent + '  ');

    scope.__filename = path;
    scope.__dirname  = file.parent.path;
    scope.process    = {env: {}};
    scope.console    = console;
    scope.exports    = {};
    scope.module     = {exports: {}};
    scope.require    = nodejs.make_require(path, curlibdirs, indent + '  ');
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
      scriptLoader.loadSubScript(spec, scope);
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
  let loadScript = function(path, curlibdirs, cb) {
    let file = getApi(Components.interfaces.nsILocalFile);
    file.initWithPath(path);
    if ( file.exists() && file.isDirectory() )
      return _loadScript(path + '/index.js', curlibdirs, cb);
    // todo: only do this if there is a ENOENT error...
    if ( ! path.match(/\.(js|jsm)$/) )
      path += '.js';
    return _loadScript(path, curlibdirs, cb);
  };

  //---------------------------------------------------------------------------
  let loadDependency = function(lib, cb) {
    try{
      // console.log('AMD.L' + indent + lib + ': loading...');
      _loadDependency(lib, function(err, mod) {
        if ( err )
        {
          console.log('AMD.L' + indent + lib + ': error ' + err);
          return cb(err);
        }
        // console.log('AMD.L' + indent + lib + ': ok');
        return cb(null, mod);
      });
    }catch(e){
      console.log('AMD.L' + indent + lib + ': exception ' + e);
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
      return loadScript(file.path, libdirs, cb);
    }
    if ( cacheModules[lib] )
    {
      // console.log('[  ] returning cached module: ' + lib);
      return cb(null, cacheModules[lib]);
    }
    let handled = false;
    let pkgfiles = [
      'node_modules/' + lib + '/package.json',
      lib + '/package.json'
    ];
    for ( var lidx=0 ; lidx<libdirs.length ; lidx++ )
    {
      for ( var pidx=0 ; pidx<pkgfiles.length ; pidx++ )
      {
        if ( handled )
          return;
        // try node-style includes: read the "package.json" => "main"
        // TODO: go through a whole cascading of attempts if package.json
        //       does not exist or does not define a "main"...
        let file = getApi(Components.interfaces.nsILocalFile);
        file.initWithPath(libdirs[lidx]);
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
          let pkglibdirs = libdirs.slice(0);
          pkglibdirs.unshift(file.parent.path);
          return loadScript(mainfile.path, pkglibdirs, function(err, mod) {
            if ( err )
              return cb(err);
            if ( ! cacheModules[lib] )
              cacheModules[lib] = mod;
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

    // console.log('AMD.D' + indent + JSON.stringify(deps));

    if ( ! cb )
      cb = function(){};

    let libs = [];
    let done = false;
    let runfactory = function() {
      let lib = factory.apply(null, libs);
      for ( let key in lib )
        scope[key] = lib[key];
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
