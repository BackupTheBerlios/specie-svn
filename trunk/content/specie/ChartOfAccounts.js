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
//	var self = this;

	// Private member
	function flattenAccount(anAccount) {
		var returnValue = new Array();

		returnValue.push(anAccount);
		if (anAccount.hasChildAccounts()) {
			for (var i = 0; i < anAccount.children.length; i++) {
				returnValue = returnValue.concat(flattenAccount(anAccount.children[i]));
			}
		}

		return returnValue;
	}

	// Privelaged method
	this.toString = function() {
		var returnString = "";

		var allAccounts = new Array();
		for (var i = 0; i < this.accounts.length; i++) {
			allAccounts = allAccounts.concat(flattenAccount(this.accounts[i]));
		}

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
	var anAccount = new Account;
	anAccount.id = 0;
	anAccount.type = "A";
	anAccount.name = "Asset";
	this.accounts.push(anAccount);

	anAccount = new Account;
	anAccount.id = 1;
	anAccount.type = "L";
	anAccount.name = "Liability";
	this.accounts.push(anAccount);

	anAccount = new Account;
	anAccount.id = 2;
	anAccount.type = "P";
	anAccount.name = "Equity";
	this.accounts.push(anAccount);

	anAccount = new Account;
	anAccount.id = 3;
	anAccount.type = "I";
	anAccount.name = "Income";
	this.accounts.push(anAccount);

	anAccount = new Account();
	anAccount.id = "4";
	anAccount.type = "E";
	anAccount.name = "Expense";
	this.accounts.push(anAccount);
}

ChartOfAccounts.prototype.load = function(filename) {
}

ChartOfAccounts.prototype.save = function(filename) {
	var outputString = this.toString();

	// Just a little clean-up
	outputString = outputString.replace(/{/g, "\n\t{");
	outputString = outputString.replace(/]$/, "\n]");

	// This is where it would be written to disk
}
