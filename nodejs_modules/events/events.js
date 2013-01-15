// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "events" node.js system package -- see:
//         http://nodejs.org/api/events.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "events" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   Class: events.EventEmitter
//     emitter.addListener(event, listener)
//     emitter.on(event, listener)
//     emitter.once(event, listener)
//     emitter.removeListener(event, listener)
//     emitter.removeAllListeners([event])
//     emitter.setMaxListeners(n)
//     emitter.listeners(event)
//     emitter.emit(event, [arg1], [arg2], [...])
//     Event: 'newListener'

exports._notImplemented = function() { throw 'TODO ::: `crypto` bridge incomplete'; };

exports.EventEmitter           = exports._notImplemented;
exports.EventEmitter.prototype = {}

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
