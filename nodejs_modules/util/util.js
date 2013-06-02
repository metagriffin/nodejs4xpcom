// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "util" node.js system package -- see:
//         http://nodejs.org/api/util.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "util" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   util.format(format, [...])
//   util.debug(string)
//   util.error([...])
//   util.puts([...])
//   util.print([...])
//   util.log(string)
//   util.inspect(object, [showHidden], [depth], [colors])
//   util.isArray(object)
//   util.isRegExp(object)
//   util.isDate(object)
//   util.isError(object)
//   util.pump(readableStream, writableStream, [callback])
//   util.inherits(constructor, superConstructor)

//-----------------------------------------------------------------------------
exports.inherits = function(kls, baseKls) {
  // TODO: is this really it?...
  for ( let key in baseKls.prototype )
  {
    if ( ! kls.prototype[key] )
      kls.prototype[key] = baseKls.prototype[key];
  }
  kls.super_ = baseKls;
}

//-----------------------------------------------------------------------------

exports._notImplemented = function(name) {
  return function() {
    throw 'TODO ::: `util` bridge incomplete (function "' + name + '")';
  };
};

exports.format      = exports._notImplemented("format");
exports.debug       = exports._notImplemented("debug");
exports.error       = exports._notImplemented("error");
exports.puts        = exports._notImplemented("puts");
exports.log         = exports._notImplemented("log");
exports.inspect     = exports._notImplemented("inspect");
exports.isArray     = exports._notImplemented("isArray");
exports.isRegExp    = exports._notImplemented("isRegExp");
exports.isDate      = exports._notImplemented("isDate");
exports.isError     = exports._notImplemented("isError");
exports.pump        = exports._notImplemented("pump");

//-----------------------------------------------------------------------------
exports.print = function(msg) {
  dump(msg);
};


//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
