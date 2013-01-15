// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "fs" node.js system package -- see:
//         http://nodejs.org/api/fs.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "fs" node.js compatibility bridge');

let n4x = require('n4x');

//-----------------------------------------------------------------------------
// complete API:
//   fs.rename(oldPath, newPath, [callback])
//   fs.renameSync(oldPath, newPath)
//   fs.truncate(fd, len, [callback])
//   fs.truncateSync(fd, len)
//   fs.chown(path, uid, gid, [callback])
//   fs.chownSync(path, uid, gid)
//   fs.fchown(fd, uid, gid, [callback])
//   fs.fchownSync(fd, uid, gid)
//   fs.lchown(path, uid, gid, [callback])
//   fs.lchownSync(path, uid, gid)
//   fs.chmod(path, mode, [callback])
//   fs.chmodSync(path, mode)
//   fs.fchmod(fd, mode, [callback])
//   fs.fchmodSync(fd, mode)
//   fs.lchmod(path, mode, [callback])
//   fs.lchmodSync(path, mode)
//   fs.stat(path, [callback])
//   fs.lstat(path, [callback])
//   fs.fstat(fd, [callback])
//   fs.statSync(path)
//   fs.lstatSync(path)
//   fs.fstatSync(fd)
//   fs.link(srcpath, dstpath, [callback])
//   fs.linkSync(srcpath, dstpath)
//   fs.symlink(srcpath, dstpath, [type], [callback])
//   fs.symlinkSync(srcpath, dstpath, [type])
//   fs.readlink(path, [callback])
//   fs.readlinkSync(path)
//   fs.realpath(path, [cache], callback)
//   fs.realpathSync(path, [cache])
//   fs.unlink(path, [callback])
//   fs.unlinkSync(path)
//   fs.rmdir(path, [callback])
//   fs.rmdirSync(path)
//   fs.mkdir(path, [mode], [callback])
//   fs.mkdirSync(path, [mode])
//   fs.readdir(path, [callback])
//   fs.readdirSync(path)
//   fs.close(fd, [callback])
//   fs.closeSync(fd)
//   fs.open(path, flags, [mode], [callback])
//   fs.openSync(path, flags, [mode])
//   fs.utimes(path, atime, mtime, [callback])
//   fs.utimesSync(path, atime, mtime)
//   fs.futimes(fd, atime, mtime, [callback])
//   fs.futimesSync(fd, atime, mtime)
//   fs.fsync(fd, [callback])
//   fs.fsyncSync(fd)
//   fs.write(fd, buffer, offset, length, position, [callback])
//   fs.writeSync(fd, buffer, offset, length, position)
//   fs.read(fd, buffer, offset, length, position, [callback])
//   fs.readSync(fd, buffer, offset, length, position)
//   fs.readFile(filename, [encoding], [callback])
//   fs.readFileSync(filename, [encoding])
//   fs.writeFile(filename, data, [encoding], [callback])
//   fs.writeFileSync(filename, data, [encoding])
//   fs.appendFile(filename, data, encoding='utf8', [callback])
//   fs.appendFileSync(filename, data, encoding='utf8')
//   fs.watchFile(filename, [options], listener)
//   fs.unwatchFile(filename, [listener])
//   fs.watch(filename, [options], [listener])
//           Caveats
//               Availability
//               Filename Argument
//   fs.exists(path, [callback])
//   fs.existsSync(path)
//   Class: fs.Stats
//   fs.createReadStream(path, [options])
//   Class: fs.ReadStream
//   Event: 'open'
//   fs.createWriteStream(path, [options])
//       fs.WriteStream
//   Event: 'open'
//           file.bytesWritten
//   Class: fs.FSWatcher
//   watcher.close()
//   Event: 'change'
//   Event: 'error'

//-----------------------------------------------------------------------------
exports.readFileSync = function(path, encoding) {
  // TODO: use `encoding`...
  let file = n4x.getApi(Components.interfaces.nsILocalFile);
  file.initWithPath(path);
  let ret  = null;
  readFile(file, false, function(err, data) {
    if ( err )
      throw 'Could not read file "' + path + '": ' + err;
    ret = data;
  });
  return ret;
};

// stat
// unlink
// readdir
// rmdir
// mkdir

exports._notImplemented = function() { throw 'TODO ::: `fs` bridge incomplete'; };

exports.rename                          = exports._notImplemented;
exports.renameSync                      = exports._notImplemented;
exports.truncate                        = exports._notImplemented;
exports.truncateSync                    = exports._notImplemented;
exports.chown                           = exports._notImplemented;
exports.chownSync                       = exports._notImplemented;
exports.fchown                          = exports._notImplemented;
exports.fchownSync                      = exports._notImplemented;
exports.lchown                          = exports._notImplemented;
exports.lchownSync                      = exports._notImplemented;
exports.chmod                           = exports._notImplemented;
exports.chmodSync                       = exports._notImplemented;
exports.fchmod                          = exports._notImplemented;
exports.fchmodSync                      = exports._notImplemented;
exports.lchmod                          = exports._notImplemented;
exports.lchmodSync                      = exports._notImplemented;
exports.stat                            = exports._notImplemented;
exports.lstat                           = exports._notImplemented;
exports.fstat                           = exports._notImplemented;
exports.statSync                        = exports._notImplemented;
exports.lstatSync                       = exports._notImplemented;
exports.fstatSync                       = exports._notImplemented;
exports.link                            = exports._notImplemented;
exports.linkSync                        = exports._notImplemented;
exports.symlink                         = exports._notImplemented;
exports.symlinkSync                     = exports._notImplemented;
exports.readlink                        = exports._notImplemented;
exports.readlinkSync                    = exports._notImplemented;
exports.realpath                        = exports._notImplemented;
exports.realpathSync                    = exports._notImplemented;
exports.unlink                          = exports._notImplemented;
exports.unlinkSync                      = exports._notImplemented;
exports.rmdir                           = exports._notImplemented;
exports.rmdirSync                       = exports._notImplemented;
exports.mkdir                           = exports._notImplemented;
exports.mkdirSync                       = exports._notImplemented;
exports.readdir                         = exports._notImplemented;
exports.readdirSync                     = exports._notImplemented;
exports.close                           = exports._notImplemented;
exports.closeSync                       = exports._notImplemented;
exports.open                            = exports._notImplemented;
exports.openSync                        = exports._notImplemented;
exports.utimes                          = exports._notImplemented;
exports.utimesSync                      = exports._notImplemented;
exports.futimes                         = exports._notImplemented;
exports.futimesSync                     = exports._notImplemented;
exports.fsync                           = exports._notImplemented;
exports.fsyncSync                       = exports._notImplemented;
exports.write                           = exports._notImplemented;
exports.writeSync                       = exports._notImplemented;
exports.read                            = exports._notImplemented;
exports.readSync                        = exports._notImplemented;
exports.readFile                        = exports._notImplemented;
exports.writeFile                       = exports._notImplemented;
exports.writeFileSync                   = exports._notImplemented;
exports.appendFile                      = exports._notImplemented;
exports.appendFileSync                  = exports._notImplemented;
exports.watchFile                       = exports._notImplemented;
exports.unwatchFile                     = exports._notImplemented;
exports.watch                           = exports._notImplemented;
exports.exists                          = exports._notImplemented;
exports.existsSync                      = exports._notImplemented;
exports.Stats                           = exports._notImplemented;
exports.Stats.prototype                 = {};
exports.createReadStream                = exports._notImplemented;
exports.ReadStream                      = exports._notImplemented;
exports.ReadStream.prototype            = {};
exports.createWriteStream               = exports._notImplemented;
exports.WriteStream                     = exports._notImplemented;
exports.WriteStream.prototype           = {};
exports.FSWatcher                       = exports._notImplemented;
exports.FSWatcher.prototype             = {};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
