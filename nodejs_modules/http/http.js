// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "http" node.js system package -- see:
//         http://nodejs.org/api/http.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "http" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   http.STATUS_CODES
//   http.createServer([requestListener])
//   http.createClient([port], [host])
//   Class: http.Server
//   Event: 'request'
//   Event: 'connection'
//   Event: 'close'
//   Event: 'checkContinue'
//   Event: 'connect'
//   Event: 'upgrade'
//   Event: 'clientError'
//   server.listen(port, [hostname], [backlog], [callback])
//   server.listen(path, [callback])
//   server.listen(handle, [callback])
//   server.close([callback])
//           server.maxHeadersCount
//   Class: http.ServerRequest
//   Event: 'data'
//   Event: 'end'
//   Event: 'close'
//           request.method
//           request.url
//           request.headers
//           request.trailers
//           request.httpVersion
//   request.setEncoding([encoding])
//   request.pause()
//   request.resume()
//           request.connection
//   Class: http.ServerResponse
//   Event: 'close'
//   response.writeContinue()
//   response.writeHead(statusCode, [reasonPhrase], [headers])
//           response.statusCode
//   response.setHeader(name, value)
//           response.sendDate
//   response.getHeader(name)
//   response.removeHeader(name)
//   response.write(chunk, [encoding])
//   response.addTrailers(headers)
//   response.end([data], [encoding])
//   http.request(options, callback)
//   http.get(options, callback)
//   Class: http.Agent
//           agent.maxSockets
//           agent.sockets
//           agent.requests
//       http.globalAgent
//   Class: http.ClientRequest
//           Event 'response'
//   Event: 'socket'
//   Event: 'connect'
//   Event: 'upgrade'
//   Event: 'continue'
//   request.write(chunk, [encoding])
//   request.end([data], [encoding])
//   request.abort()
//   request.setTimeout(timeout, [callback])
//   request.setNoDelay([noDelay])
//   request.setSocketKeepAlive([enable], [initialDelay])
//       http.ClientResponse
//   Event: 'data'
//   Event: 'end'
//   Event: 'close'
//           response.statusCode
//           response.httpVersion
//           response.headers
//           response.trailers
//   response.setEncoding([encoding])
//   response.pause()
//   response.resume()

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `http` bridge incomplete'; };


exports.STATUS_CODES                  = exports._notImplemented;
exports.createServer                  = exports._notImplemented;
exports.createClient                  = exports._notImplemented;
exports.request                       = exports._notImplemented;
exports.get                           = exports._notImplemented;
exports.globalAgent                   = exports._notImplemented;
exports.Server                        = exports._notImplemented;
exports.Server.prototype              = {};
exports.ServerRequest                 = exports._notImplemented;
exports.ServerRequest.prototype       = {};
exports.ServerResponse                = exports._notImplemented;
exports.ServerResponse.prototype      = {};
exports.Agent                         = exports._notImplemented;
exports.Agent.prototype               = {};
exports.ClientRequest                 = exports._notImplemented;
exports.ClientRequest.prototype       = {};
exports.ClientResponse                = exports._notImplemented;
exports.ClientResponse.prototype      = {};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
