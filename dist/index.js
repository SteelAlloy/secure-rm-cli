"use strict";
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const Parser = tslib_1.__importStar(require("@oclif/parser"));
const path_1 = tslib_1.__importDefault(require("path"));
const glob_1 = tslib_1.__importDefault(require("glob"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const secure_rm_1 = require("secure-rm");
const check_1 = tslib_1.__importDefault(require("./check"));
const table_1 = tslib_1.__importDefault(require("./table"));

console.log("new lib")
// Custom flag
const customFlag = (opts = {}, action) => {
    return Parser.flags.boolean(Object.assign(opts, {
        parse: (_, cmd) => {
            action();
            cmd.exit(0);
        }
    }));
};
class SecureRmCommand extends command_1.Command {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { argv, flags } = this.parse(SecureRmCommand);
            let paths = [];
            // Search for files if globbing is enabled
            if (flags.globbing) {
                for (let i = 0; i < argv.length; i++) {
                    // If relative path, transform to absolute
                    if (!path_1.default.isAbsolute(argv[i])) {
                        argv[i] = path_1.default.join(process.cwd(), argv[i]);
                    }
                    // If on Windows, transform backslashes in forwardslashes
                    if (path_1.default.sep !== '/') {
                        argv[i] = argv[i].split(path_1.default.sep).join('/');
                    }
                    // Search for files
                    paths = paths.concat(glob_1.default.sync(argv[i]));
                }
            }
            else
                paths = argv;
            if (paths.length === 0)
                console.log(chalk_1.default.bold.yellow('No such file or directory.'));
            // if there are files then continue
            else
                check_1.default(argv, flags);
        });
    }
}
SecureRmCommand.description = `CLI help:
Completely erases files by making recovery impossible.
For extra documentation, go to https://www.npmjs.com/package/secure-rm
`;
SecureRmCommand.examples = [
    '$ secure-rm ./folder/*.js ./file.js -s gutmann -f',
    '$ secure-rm /d/code -m',
];
SecureRmCommand.flags = {
    // add --version flag to show CLI version
    version: command_1.flags.version({ char: 'v' }),
    // add --help flag to show CLI version
    help: command_1.flags.help({ char: 'h' }),
    standard: command_1.flags.option({
        char: 's',
        description: 'select the erasure standard',
        default: 'secure',
        parse: (input) => {
            if (secure_rm_1.validIDs.includes(input))
                return input;
            else {
                console.log(chalk_1.default.bold.yellow(`'${input}' is not a valid ID. \nList of valid IDs: ${secure_rm_1.validIDs}`));
                return 'secure';
            }
        }
    }),
    retries: command_1.flags.option({
        char: 'r',
        description: 'max retries if error',
        default: 3,
        parse: (input) => {
            return isNaN(parseInt(input))
                ? 3
                : parseInt(input);
        }
    }),
    force: command_1.flags.boolean({ char: 'f', description: 'avoid checks' }),
    mute: command_1.flags.boolean({ char: 'm', description: 'mutes the cli to the bare minimum' }),
    globbing: command_1.flags.boolean({ description: 'allow or not file globbing', default: true, allowNo: true }),
    table: customFlag({ char: 't', description: 'show the standards table' }, table_1.default)
};
SecureRmCommand.args = [{ name: 'path', required: true }];
// Multiple args allowed
SecureRmCommand.strict = false;
module.exports = SecureRmCommand;
