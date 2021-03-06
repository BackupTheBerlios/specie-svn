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

function Transaction() {
	this.id = -1;
	this.description = null;
	this.date = null;
	this.entries = new Array();
}

Transaction.prototype.appendEntry = function(newEntry) {
	if (newEntry.transaction != this) {
		throw new Error("Unexpected transaction association.");
	}

	if (newEntry.account == null) {
		throw new Error("An Entry must be associated with an Account.");
	}

	this.entries.push(newEntry);
}

Transaction.prototype.createEntry = function() {
	var newEntry = new Entry();
	newEntry.transaction = this;

	return newEntry;
}

Transaction.prototype.removeEntry = function(oldEntry) {
	for (var i = 0; i < this.entries.length; i++) {
		if (this.entries[i] == oldEntry) {
			this.entries.splice(i, 1);
			return;
		}
	}

	throw new Error("Unknown entry.");
}

Transaction.prototype.isBalanced = function() {
	var debitValue = 0;
	var creditValue = 0;

	for (var i = 0; i < this.entries.length; i++) {
		if (this.entries[i].type == "D") {
			debitValue += this.entries[i].value;
		} else if (this.entries[i].type == "C") {
			creditValue += this.entries[i].value;
		}
	}

	if (debitValue == creditValue) {
		return true;
	} else {
		return false;
	}
}

Transaction.prototype.toString = function() {
	var returnString = "";

	returnString += "{"
		+ "description:\"" + this.description.replace(/"/, "\\\"") + "\","
		+ "date:\"" + this.date.toString() + "\",";

	returnString += "entries:[";
	for (var i = 0; i < this.entries.length; i++) {
		returnString += this.entries[i].toString();
	}
	returnString += "]";

	returnString += "}";

	return returnString;
}
