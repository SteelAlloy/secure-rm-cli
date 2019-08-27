"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const secure_rm_1 = tslib_1.__importStar(require("secure-rm"));
let log;
function check(paths, flags) {
    log = require('./log')(flags.mute);
    console.log(chalk_1.default.bold.yellow('Method: ' + secure_rm_1.standards[flags.standard].name + '\n'));
    if (flags.force)
        remove(paths, flags.standard, flags.retries);
    // Ask for confirmation
    else {
        inquirer_1.default.prompt([
            {
                type: 'checkbox',
                message: 'Do you really want to delete these files?',
                name: 'choices',
                choices: paths.map(p => {
                    var obj = {
                        name: p
                    };
                    return obj;
                })
            }
        ])
            .then(answers => {
            if (answers.choices.length === 0)
                console.log(chalk_1.default.bold.yellow('No file or directory selected.'));
            else
                remove(answers.choices, flags.standard, flags.retries);
        });
    }
}
exports.default = check;
let errorsRecord = {};
secure_rm_1.event.on('error', (file, err) => {
    errorsRecord[err] = errorsRecord[err] || [];
    errorsRecord[err].push(file);
});
function remove(paths, standardID, retries) {
    let progress = 0;
    for (let i = paths.length - 1; i >= 0; i--) {
        // Record time
        const start = process.hrtime();
        secure_rm_1.default(paths[i], { standard: standardID, maxBusyTries: retries }, (err, path) => {
            if (err)
                log.error(chalk_1.default.red.bold('Deletion of ') + chalk_1.default.red(paths[i]) + chalk_1.default.red.bold(` failed in ${duration(start)}:\n`) + chalk_1.default.red(err.toString()));
            else
                log.info(chalk_1.default.cyan(path) + chalk_1.default.cyan.bold(` deleted in ${duration(start)}.`));
            progress++;
            if (progress === paths.length) {
                if (Object.keys(errorsRecord).length !== 0) {
                    log.error(chalk_1.default.cyan('Process ended with errors:\n'));
                    for (let err in errorsRecord) {
                        log(chalk_1.default.cyan.bold(err) + chalk_1.default.cyan('\n    ' + errorsRecord[err].reduce((accumulator, currentValue) => `${accumulator}\n    ${currentValue}`)));
                    }
                }
                else {
                    log.info(chalk_1.default.bold.cyan('Process ended without errors.'));
                }
            }
        });
    }
}
// Time taken
function duration(start) {
    const diff = process.hrtime(start);
    return diff[0] > 0
        ? `${(diff[0] + diff[1] / 1e9).toFixed(3)}s (${diff[0] * 1e3 + diff[1] / 1e6} ms)`
        : `${diff[0] / 1e3 + diff[1] / 1e6} ms`;
}
