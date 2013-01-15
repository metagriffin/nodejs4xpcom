// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "path" node.js system package -- see:
//         http://nodejs.org/api/path.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "path" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   path.normalize(p)
//   path.join([path1], [path2], [...])
//   path.resolve([from ...], to)
//   path.relative(from, to)
//   path.dirname(p)
//   path.basename(p, [ext])
//   path.extname(p)
//   path.sep

let n4x = require('n4x');

//-----------------------------------------------------------------------------
exports.join = function(path) {
  let file = n4x.getApi(Components.interfaces.nsILocalFile);
  file.initWithPath(path);
  for ( var idx=1 ; idx<arguments.length ; idx++ )
    file.appendRelativePath(arguments[idx]);
  return file.path;
}

//-----------------------------------------------------------------------------

exports._notImplemented = function() { throw 'TODO ::: `path` bridge incomplete'; };

exports.normalize = exports._notImplemented;
exports.resolve   = exports._notImplemented;
exports.relative  = exports._notImplemented;
exports.dirname   = exports._notImplemented;
exports.basename  = exports._notImplemented;
exports.extname   = exports._notImplemented;
exports.sep       = '/';

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
