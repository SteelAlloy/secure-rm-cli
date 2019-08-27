"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const tty_table_1 = tslib_1.__importDefault(require("tty-table"));
const secure_rm_1 = require("secure-rm");
// Draw the standards table
const header = [
    {
        value: 'Id',
        color: 'redBright',
        width: 50
    },
    {
        value: 'Name',
        color: 'white'
    },
    {
        value: 'Passes',
        color: 'white',
        width: 30
    },
    {
        value: 'Description',
        color: 'white',
        align: 'left'
    }
];
var rows = [];
for (let i = 0; i < secure_rm_1.validIDs.length; i++) {
    rows.push([secure_rm_1.validIDs[i], secure_rm_1.standards[secure_rm_1.validIDs[i]].name, secure_rm_1.standards[secure_rm_1.validIDs[i]].passes, secure_rm_1.standards[secure_rm_1.validIDs[i]].description]);
}
var t1 = tty_table_1.default(header, rows, {
    borderStyle: 1,
    borderColor: 'cyan',
    paddingBottom: 0,
    headerAlign: 'center',
    headerColor: 'yellow',
    align: 'center',
    color: 'white'
    // truncate: "..."
});
const str1 = t1.render();
function table() {
    console.log(chalk_1.default.bold('METHODS'));
    console.log(str1);
}
exports.default = table;
