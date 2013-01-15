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

* assert: <span style="color:#dd3300;">20%</span>
* buffer: <span style="color:#ff0000;">0%</span>
* child_process: <span style="color:#ff0000;">0%</span>
* cluster: <span style="color:#ff0000;">0%</span>
* crypto: <span style="color:#ff0000;">0%</span>
* dns: <span style="color:#ff0000;">0%</span>
* domain: <span style="color:#ff0000;">0%</span>
* events: <span style="color:#ff0000;">0%</span>
* fs: <span style="color:#ff0000;">0%</span>
* globals: <span style="color:#ff0000;">0%</span>
* http: <span style="color:#ff0000;">0%</span>
* https: <span style="color:#ff0000;">0%</span>
* modules: <span style="color:#ff0000;">0%</span>
* net: <span style="color:#ff0000;">0%</span>
* os: <span style="color:#ff0000;">0%</span>
* path: <span style="color:#ff0000;">0%</span>
* process: <span style="color:#ff0000;">0%</span>
* punycode: <span style="color:#ff0000;">0%</span>
* querystring: <span style="color:#ff0000;">0%</span>
* readline: <span style="color:#ff0000;">0%</span>
* repl: <span style="color:#ff0000;">0%</span>
* stdio: <span style="color:#ff0000;">0%</span>
* stream: <span style="color:#ff0000;">0%</span>
* string_decoder: <span style="color:#ff0000;">0%</span>
* timers: <span style="color:#ff0000;">0%</span>
* tls: <span style="color:#ff0000;">0%</span>
* tty: <span style="color:#ff0000;">0%</span>
* dgram: <span style="color:#ff0000;">0%</span>
* url: <span style="color:#ff0000;">0%</span>
* util: <span style="color:#ff0000;">0%</span>
* vm: <span style="color:#ff0000;">0%</span>
* zlib: <span style="color:#ff0000;">0%</span>

These adapter packages will be implemented on an as-needed by the
maintainers basis; if you need one before we do, you are encouraged to
implement it and issue a pull-request: these will be accepted quickly.
