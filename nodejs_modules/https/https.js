// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "https" node.js system package -- see:
//         http://nodejs.org/api/https.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "https" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   Class: https.Server
//   https.createServer(options, [requestListener])
//     server.listen(port, [host], [backlog], [callback])
//     server.listen(path, [callback])
//     server.listen(handle, [callback])
//     server.close([callback])
//   https.request(options, callback)
//   https.get(options, callback)
//   Class: https.Agent
//   https.globalAgent

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `https` bridge incomplete'; };

exports.createServer                  = exports._notImplemented;
exports.request                       = exports._notImplemented;
exports.get                           = exports._notImplemented;
exports.globalAgent                   = exports._notImplemented;
exports.Server                        = exports._notImplemented;
exports.Server.prototype              = {};
exports.Agent                         = exports._notImplemented;
exports.Agent.prototype               = {};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
