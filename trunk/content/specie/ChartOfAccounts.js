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

function ChartOfAccounts() {
	this.accounts = new Array();
	this.filename = null;

	// Used by private methods
	var self = this;

	// Private member
	function flattenAccount(aAccount) {
dump("aAccount.name: " + aAccount.name);
		var returnValue = new Array();

dump("aAccount.hasChildAccounts(): " + aAccount.hasChildAccounts());
		returnValue.push(aAccount);
		if (aAccount.hasChildAccounts()) {
			for (var i = 0; i < aAccount.children.length; i++) {
				returnValue = returnValue.concat(flattenAccount(aAccount.children[i]));
			}
		}

dump("returnValue.length: " + returnValue.length);
		return returnValue;
	}

	// Privelaged method
	this.toString = function() {
		var returnString = "";
		var allAccounts = new Array();
		for (var i = 0; i < this.accounts.length; i++) {
			allAccounts = allAccounts.concat(flattenAccount(this.accounts[i]));
		}
dump("allAccounts.length: " + allAccounts.length);

		returnString += "[";
		for (var i = 0; i < allAccounts.length; i++) {
			returnString += allAccounts[i].toString();
			if (i < allAccounts.length - 1) {
				returnString += ",";
			}
		}
		returnString += "]";

		return returnString;
	}

	// Initialize common accounts that all Charts share
	var aAccount = new Account;
	aAccount.id = 0;
	aAccount.type = "A";
	aAccount.name = "Asset";
	this.accounts.push(aAccount);

	aAccount = new Account;
	aAccount.id = 1;
	aAccount.type = "L";
	aAccount.name = "Liability";
	this.accounts.push(aAccount);

	aAccount = new Account;
	aAccount.id = 2;
	aAccount.type = "P";
	aAccount.name = "Equity";
	this.accounts.push(aAccount);

	aAccount = new Account;
	aAccount.id = 3;
	aAccount.type = "I";
	aAccount.name = "Income";
	this.accounts.push(aAccount);

	aAccount = new Account();
	aAccount.id = "4";
	aAccount.type = "E";
	aAccount.name = "Expense";
	this.accounts.push(aAccount);
}

ChartOfAccounts.prototype.load = function(filename) {
}

ChartOfAccounts.prototype.save = function(filename) {
}
