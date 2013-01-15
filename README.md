# nodejs4xpcom (n4x)

``nodejs4xpcom`` (or `n4x`) is an XPCOM plugin (for Firefox, Thunderbird,
etc) that provides an AMD-compatible Node.JS module loader.

## Usage

First, this plugin must be installed in the XPCOM application
(Firefox, Thunderbird, etc). Then, the following code snippet will
allow you to ``require`` or ``define`` dependencies to Node.JS modules
that have been installed into the standard npm ``node_modules``
directory.

For example, the following makes use of the
[underscore](https://npmjs.org/package/underscore) module:

``` js
Components.utils.import("resource://n4x/modules/nodejs.jsm");
let require = nodejs.make_require(__LOCATION__);
let _ = require('underscore');
let squares = _.map([3, 6, 12], function(i){ return i*i; }));
// resurt: squares == [9, 36, 144]
```

## Limitations

`n4x` loads Node.JS modules as if they were standard JavaScript
scripts. Many modules, however, make use of other modules that are
provided by the Node.JS environment, such as ``fs`` and ``util``, and
therefore cannot be loaded by XPCOM. In order to provide that
functionality, an adapter for each of those system modules must be
created. Here is a summary of that effort for each of the system
modules for Node.JS version 0.8.17:

Module        | Support | Module  | Support | Module         | Support | Module | Support
------------- | ------- | ------- | ------- | -------------- | ------- | ------ | -------
assert        | 20%     | fs      | 0%      | process        | 0%      | tls    | 0%
buffer        | 0%      | globals | 10%     | punycode       | 0%      | tty    | 0%
child_process | 0%      | http    | 0%      | querystring    | 0%      | dgram  | 0%
cluster       | 0%      | https   | 0%      | readline       | 0%      | url    | 0%
crypto        | 0%      | modules | 0%      | repl           | 0%      | util   | 0%
dns           | 0%      | net     | 0%      | stdio          | 10%     | vm     | 0%
domain        | 0%      | os      | 0%      | stream         | 0%      | zlib   | 0%
events        | 0%      | path    | 0%      | string_decoder | 0%      |        |

These adapter packages will be implemented on an as-needed by the
maintainers basis; if you need one before we do, you are encouraged to
implement it and issue a pull-request: these will be accepted quickly.
