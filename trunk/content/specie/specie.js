/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Specie User Interface.
 *
 * The Initial Developer of the Original Code is
 * Todd Ross.
 * Portions created by the Initial Developer are Copyright (C) 2005
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/* $Id$ */

function doDisplayPanel(which) {
  var contentFrame = document.getElementById("iframe_content");
  contentFrame.setAttribute("src", which + "Panel.xul");
}

function doNew() {
  
}

function doFileOpen(options) {
  var strbundle = document.getElementById("stringbundle_specie");
  var filename = "";

  if (options && options.filename) {
    filename = options.filename;
  } else {
    var nsIFilePicker = Components.interfaces.nsIFilePicker;
    var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);

    fp.init(window, strbundle.getString("filepicker.open.title"), nsIFilePicker.modeOpen);
    fp.appendFilter("Specie Files", "*.spc");

    var res = fp.show();
    if (res == nsIFilePicker.returnOK) {
      filename = fp.file;
    } else {
      return;
    }
  }

  var nsILocalFile = Components.interfaces.nsILocalFile;
  var file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile);

  file.initWithPath(filename);
  if (!file.exists()) {
    alert("filename: " + filename);
    alert(strbundle.getFormattedString("file.exists.not", [filename]));
  }
}
