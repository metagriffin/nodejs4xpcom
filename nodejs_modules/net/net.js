// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "net" node.js system package -- see:
//         http://nodejs.org/api/net.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "net" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   net.createServer([options], [connectionListener])
//   net.connect(options, [connectionListener])
//   net.createConnection(options, [connectionListener])
//   net.connect(port, [host], [connectListener])
//   net.createConnection(port, [host], [connectListener])
//   net.connect(path, [connectListener])
//   net.createConnection(path, [connectListener])
//   Class: net.Server
//   server.listen(port, [host], [backlog], [callback])
//   server.listen(path, [callback])
//   server.listen(handle, [callback])
//   server.close([callback])
//   server.address()
//           server.maxConnections
//           server.connections
//   Event: 'listening'
//   Event: 'connection'
//   Event: 'close'
//   Event: 'error'
//   Class: net.Socket
//   new net.Socket([options])
//   socket.connect(port, [host], [connectListener])
//   socket.connect(path, [connectListener])
//           socket.bufferSize
//   socket.setEncoding([encoding])
//   socket.write(data, [encoding], [callback])
//   socket.end([data], [encoding])
//   socket.destroy()
//   socket.pause()
//   socket.resume()
//   socket.setTimeout(timeout, [callback])
//   socket.setNoDelay([noDelay])
//   socket.setKeepAlive([enable], [initialDelay])
//   socket.address()
//           socket.remoteAddress
//           socket.remotePort
//           socket.bytesRead
//           socket.bytesWritten
//   Event: 'connect'
//   Event: 'data'
//   Event: 'end'
//   Event: 'timeout'
//   Event: 'drain'
//   Event: 'error'
//   Event: 'close'
//   net.isIP(input)
//   net.isIPv4(input)
//   net.isIPv6(input)

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `net` bridge incomplete'; };

exports.createServer      = exports._notImplemented;
exports.connect           = exports._notImplemented;
exports.createConnection  = exports._notImplemented;
exports.connect           = exports._notImplemented;
exports.createConnection  = exports._notImplemented;
exports.connect           = exports._notImplemented;
exports.createConnection  = exports._notImplemented;
exports.isIP              = exports._notImplemented;
exports.isIPv4            = exports._notImplemented;
exports.isIPv6            = exports._notImplemented;
exports.Server            = exports._notImplemented;
exports.Server.prototype  = {};
exports.Socket            = exports._notImplemented;
exports.Socket.prototype  = {};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
