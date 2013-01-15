# nodejs4xpcom

``nodejs4xpcom`` (or `n4x`) is an XPCOM plugin (for Firefox, Thunderbird,
etc) that provides an AMD-compatible Node.JS module loader.

## Usage

First, this plugin must be installed in the XPCOM application
(Firefox, Thunderbird, etc). Then, the following code snippet will
allow you to ``require`` or ``define`` dependencies to Node.JS modules
that have been installed into the standard npm ``node_modules``
directory.

For example, the following makes use of `underscore`:

``` js
Components.utils.import("resource://n4x/modules/nodejs.jsm");
let require = nodejs.make_require(__LOCATION__.path, [__LOCATION__.parent.parent.path]);
let _ = require('underscore');
let squares = _.map([3, 6, 12], function(i){ return i*i; }));
// squares === [9, 36, 144]
```
