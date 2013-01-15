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

exports._notImplemented = function() { throw 'TODO ::: `url` bridge incomplete'; };

exports.format      = exports._notImplemented;
exports.debug       = exports._notImplemented;
exports.error       = exports._notImplemented;
exports.puts        = exports._notImplemented;
exports.print       = exports._notImplemented;
exports.log         = exports._notImplemented;
exports.inspect     = exports._notImplemented;
exports.isArray     = exports._notImplemented;
exports.isRegExp    = exports._notImplemented;
exports.isDate      = exports._notImplemented;
exports.isError     = exports._notImplemented;
exports.pump        = exports._notImplemented;

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
