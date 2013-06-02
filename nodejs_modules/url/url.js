// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "url" node.js system package -- see:
//         http://nodejs.org/api/url.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "url" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   parse(urlStr, [parseQueryString], [slashesDenoteHost])
//   format(urlObj)
//   resolve(from, to)

//-----------------------------------------------------------------------------

exports._notImplemented = function(name) {
  return function() {
    throw 'TODO ::: `url` bridge incomplete (function "' + name + '")';
  };
};

exports.parse     = exports._notImplemented("parse");
exports.format    = exports._notImplemented("format");
exports.resolve   = exports._notImplemented("resolve");

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
