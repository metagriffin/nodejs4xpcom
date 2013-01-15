// -*- coding: utf-8 -*-
//-----------------------------------------------------------------------------
// file: $Id$
// desc: helpers for the compatibility bridge between node.js and xpcom.
// auth: metagriffin <mg.npmjs@uberdev.org>
// date: 2013/01/13
// copy: (C) CopyLoose 2013 UberDev <hardcore@uberdev.org>, No Rights Reserved.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// todo: getApi needs to be improved to cleanup after shutdown, the way
//       that generateServiceAccessor does in
//         resource://calendar/modules/calUtils.jsm
exports.getApi = function(id, iface) {
  if ( ! iface )
  {
    // accounting for this *idiotic* interface "creation"...
    iface = id;
    if ( iface === Components.interfaces.nsIFileInputStream )
      id = '@mozilla.org/network/file-input-stream;1';
    else if ( iface === Components.interfaces.nsIScriptableInputStream)
      id = '@mozilla.org/scriptableinputstream;1';
    else if ( iface === Components.interfaces.nsIIOService2 )
      id = '@mozilla.org/network/io-service;1';
    else if ( iface === Components.interfaces.nsILocalFile )
      id = '@mozilla.org/file/local;1';
    else if ( iface === Components.interfaces.mozIJSSubScriptLoader )
      id = '@mozilla.org/moz/jssubscript-loader;1';
  }
  return Components.classes[id].createInstance(iface);
};

//-----------------------------------------------------------------------------
// end of $Id$
//-----------------------------------------------------------------------------
