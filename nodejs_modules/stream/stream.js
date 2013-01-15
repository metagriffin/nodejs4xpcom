// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "stream" node.js system package -- see:
//         http://nodejs.org/api/stream.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "stream" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//       Readable Stream
//   Event: 'data'
//   Event: 'end'
//   Event: 'error'
//   Event: 'close'
//           stream.readable
//   stream.setEncoding([encoding])
//   stream.pause()
//   stream.resume()
//   stream.destroy()
//   stream.pipe(destination, [options])
//       Writable Stream
//   Event: 'drain'
//   Event: 'error'
//   Event: 'close'
//   Event: 'pipe'
//           stream.writable
//   stream.write(string, [encoding])
//   stream.write(buffer)
//   stream.end()
//   stream.end(string, encoding)
//   stream.end(buffer)
//   stream.destroy()
//   stream.destroySoon()

//-----------------------------------------------------------------------------
exports.Stream = function() { throw 'TODO ::: `stream` bridge incomplete'; };

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
