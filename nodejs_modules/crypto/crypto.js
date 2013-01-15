// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "crypto" node.js system package -- see:
//         http://nodejs.org/api/crypto.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "crypto" node.js compatibility bridge');

//-----------------------------------------------------------------------------
// complete API:
//   crypto.createCredentials(details)
//   crypto.createHash(algorithm)
//   Class: Hash
//     hash.update(data, [input_encoding])
//     hash.digest([encoding])
//   crypto.createHmac(algorithm, key)
//   Class: Hmac
//     hmac.update(data)
//     hmac.digest([encoding])
//   crypto.createCipher(algorithm, password)
//   crypto.createCipheriv(algorithm, key, iv)
//   Class: Cipher
//     cipher.update(data, [input_encoding], [output_encoding])
//     cipher.final([output_encoding])
//     cipher.setAutoPadding(auto_padding=true)
//   crypto.createDecipher(algorithm, password)
//   crypto.createDecipheriv(algorithm, key, iv)
//   Class: Decipher
//     decipher.update(data, [input_encoding], [output_encoding])
//     decipher.final([output_encoding])
//     decipher.setAutoPadding(auto_padding=true)
//   crypto.createSign(algorithm)
//   Class: Signer
//     signer.update(data)
//     signer.sign(private_key, [output_format])
//   crypto.createVerify(algorithm)
//   Class: Verify
//     verifier.update(data)
//     verifier.verify(object, signature, [signature_format])
//   crypto.createDiffieHellman(prime_length)
//   crypto.createDiffieHellman(prime, [encoding])
//   Class: DiffieHellman
//     diffieHellman.generateKeys([encoding])
//     diffieHellman.computeSecret(other_public_key, [input_encoding], [output_encoding])
//     diffieHellman.getPrime([encoding])
//     diffieHellman.getGenerator([encoding])
//     diffieHellman.getPublicKey([encoding])
//     diffieHellman.getPrivateKey([encoding])
//     diffieHellman.setPublicKey(public_key, [encoding])
//     diffieHellman.setPrivateKey(public_key, [encoding])
//   crypto.getDiffieHellman(group_name)
//   crypto.pbkdf2(password, salt, iterations, keylen, callback)
//   crypto.randomBytes(size, [callback])

exports._notImplemented = function() { throw 'TODO ::: `crypto` bridge incomplete'; };

exports.createCredentials       = exports._notImplemented;
exports.createHash              = exports._notImplemented;
exports.Hash                    = exports._notImplemented;
exports.Hash.prototype          = {};
exports.createHmac              = exports._notImplemented;
exports.Hmac                    = exports._notImplemented;
exports.Hmac.prototype          = {};
exports.createCipher            = exports._notImplemented;
exports.createCipheriv          = exports._notImplemented;
exports.Cipher                  = exports._notImplemented;
exports.Cipher.prototype        = {};
exports.createDecipher          = exports._notImplemented;
exports.createDecipheriv        = exports._notImplemented;
exports.Decipher                = exports._notImplemented;
exports.Decipher.prototype      = {};
exports.createSign              = exports._notImplemented;
exports.Signer                  = exports._notImplemented;
exports.Signer.prototype        = {};
exports.createVerify            = exports._notImplemented;
exports.Verify                  = exports._notImplemented;
exports.Verify.prototype        = {};
exports.createDiffieHellman     = exports._notImplemented;
exports.createDiffieHellman     = exports._notImplemented;
exports.DiffieHellman           = exports._notImplemented;
exports.DiffieHellman.prototype = {};
exports.getDiffieHellman        = exports._notImplemented;
exports.pbkdf2                  = exports._notImplemented;
exports.randomBytes             = exports._notImplemented;

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
