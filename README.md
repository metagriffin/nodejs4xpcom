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
// resurt: squares == [9, 36, 144]
```

## Limitations

`n4x` loads Node.JS modules as if they were standard JavaScript
scripts. Many modules, however, make use of other modules that are
provided by the Node.JS environment, such as ``fs`` and ``util``. In
order to provide that functionality, an adapter for each of those
system modules must be created. Here is a summary of that effort for
each of the system modules for Node.JS version 0.8.17:

* assert: 20%
* buffer: 0%
* child_process: 0%
* cluster: 0%
* crypto: 0%
* dns: 0%
* domain: 0%
* events: 0%
* fs: 0%
* globals: 0%
* http: 0%
* https: 0%
* modules: 0%
* net: 0%
* os: 0%
* path: 0%
* process: 0%
* punycode: 0%
* querystring: 0%
* readline: 0%
* repl: 0%
* stdio: 0%
* stream: 100%
* string_decoder: 0%
* timers: 0%
* tls: 0%
* tty: 0%
* dgram: 0%
* url: 0%
* util: 0%
* vm: 0%
* zlib: 0%

These adapter packages will be implemented on an as-needed by the
maintainers basis; if you need one before we do, you are encouraged to
implement it and issue a pull-request: these will be honored quickly.
