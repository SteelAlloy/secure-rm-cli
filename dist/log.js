"use strict";
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const secure_rm_1 = require("secure-rm");
const ololog_1 = tslib_1.__importDefault(require("ololog"));
const log = ololog_1.default.configure({ time: true, locate: false, tag: true }).handleNodeErrors();
module.exports = (mute) => {
    if (!mute) {
        secure_rm_1.event.on('start', (file) => log(chalk_1.default.bold.yellow('Starting ') + file));
        secure_rm_1.event.on('unlink', (file) => log(chalk_1.default.bold.magenta('Unlinking ') + file));
        secure_rm_1.event.on('done', (file) => log(chalk_1.default.bold.green('Done ') + file));
        secure_rm_1.event.on('verbose', (file, info) => log(chalk_1.default.bold.blue(info) + file));
        secure_rm_1.event.on('warn', (file, err) => log.warn(chalk_1.default.yellow(err) + file));
        secure_rm_1.event.on('error', (file, err) => log.error(chalk_1.default.red(err) + file));
    }
    return log;
};
