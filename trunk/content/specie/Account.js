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
 * The Original Code is Specie Classes.
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

function Account() {
	this.id = -1;
	this.type = null;
	this.name = "New Account";
	this.description = "";
	this.parent = null;
	this.entries = new Array();
	this.children = new Array();
}

Account.prototype.appendChild = function(newChild) {
	this.children.push(newChild);
}

Account.prototype.createChild = function() {
	var newChild = new Account;
	// this is severely flawed
	newChild.id = this.id + "." + this.children.length;
	newChild.type = this.type;
	newChild.parent = this;
	return newChild;
}

Account.prototype.removeChild = function(oldChild) {
	for (var i = 0; i < this.children.length; i++) {
		if (this.children[i] == oldChild) {
			this.children.splice(i, 1);
			return;
		}
	}

	throw new Error("Unknown child Account.");
}

Account.prototype.hasChildAccounts = function() {
	if (this.children.length > 0) {
		return true;
	} else {
		return false;
	}
}

Account.prototype.toString = function() {
	return    "{"
		+ "id:\"" + this.id + "\","
		+ "type:\"" + this.type + "\","
		+ "name:\"" + this.name + "\","
		+ "description:\"" + this.description + "\","
		+ "parent:" + (this.parent ? "\"" + this.parent.id + "\"": null)
		+ "}";
}
