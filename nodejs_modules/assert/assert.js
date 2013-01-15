// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: compatibility bridge between node.js and xpcom for the
//       "assert" node.js system package -- see:
//         http://nodejs.org/api/assert.html
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

console.log('[**] TODO ::: implement "assert" node.js compatibility bridge');

//-----------------------------------------------------------------------------
let assert = function(truthy, message) {
  return assert.ok(truthy, message);
};

//-----------------------------------------------------------------------------
assert.ok = function(truthy, message) {
  return assert.equal(true, !! truthy, message);
};

//-----------------------------------------------------------------------------
assert.equal = function(check, value, message) {
  if ( check == value )
    return;
  throw message || ( 'Assertion failed: ' + check + ' == ' + value );
};

//-----------------------------------------------------------------------------
assert.notEqual = function(check, value, message) {
  if ( check != value )
    return;
  throw message || ( 'Assertion failed: ' + check + ' != ' + value );
};

//-----------------------------------------------------------------------------
// missing API:
//   assert.fail(actual, expected, message, operator)
//   assert.deepEqual(actual, expected, [message])
//   assert.notDeepEqual(actual, expected, [message])
//   assert.strictEqual(actual, expected, [message])
//   assert.notStrictEqual(actual, expected, [message])
//   assert.throws(block, [error], [message])
//   assert.doesNotThrow(block, [error], [message])
//   assert.ifError(value)

assert._notImplemented = function() { throw 'TODO ::: `assert` bridge incomplete'; };

assert.fail             = assert._notImplemented;
assert.deepEqual        = assert._notImplemented;
assert.notDeepEqual     = assert._notImplemented;
assert.strictEqual      = assert._notImplemented;
assert.notStrictEqual   = assert._notImplemented;
assert.throws           = assert._notImplemented;
assert.doesNotThrow     = assert._notImplemented;
assert.ifError          = assert._notImplemented;

module.exports = assert;

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
