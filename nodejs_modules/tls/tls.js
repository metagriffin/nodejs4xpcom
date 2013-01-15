// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "tls" node.js system package -- see:
//         http://nodejs.org/api/tls.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "tls" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//       Client-initiated renegotiation attack mitigation
//       NPN and SNI
//   tls.createServer(options, [secureConnectionListener])
//   tls.connect(options, [callback])
//   tls.connect(port, [host], [options], [callback])
//   tls.createSecurePair([credentials], [isServer], [requestCert], [rejectUnauthorized])
//   Class: SecurePair
//   Event: 'secure'
//   Class: tls.Server
//   Event: 'secureConnection'
//   Event: 'clientError'
//   server.listen(port, [host], [callback])
//   server.close()
//   server.address()
//   server.addContext(hostname, credentials)
//           server.maxConnections
//           server.connections
//   Class: tls.CleartextStream
//   Event: 'secureConnect'
//           cleartextStream.authorized
//           cleartextStream.authorizationError
//   cleartextStream.getPeerCertificate()
//   cleartextStream.getCipher()
//   cleartextStream.address()
//           cleartextStream.remoteAddress
//           cleartextStream.remotePort

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `tls` bridge incomplete'; };

exports.createServer                  = exports._notImplemented;
exports.connect                       = exports._notImplemented;
exports.connect                       = exports._notImplemented;
exports.createSecurePair              = exports._notImplemented;
exports.SecurePair                    = exports._notImplemented;
exports.SecurePair.prototype          = {};
exports.Server                        = exports._notImplemented;
exports.Server.prototype              = {};
exports.CleartextStream               = exports._notImplemented;
exports.CleartextStream.prototype     = {};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
