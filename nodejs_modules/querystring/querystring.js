// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "querystring" node.js system package -- see:
//         http://nodejs.org/api/querystring.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "querystring" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   stringify(obj, [sep], [eq])
//   parse(str, [sep], [eq], [options])
//   escape
//   unescape

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `querystring` bridge incomplete'; };

exports.stringify = exports._notImplemented;
exports.parse     = exports._notImplemented;
exports.escape    = exports._notImplemented;
exports.unescape  = exports._notImplemented;

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
