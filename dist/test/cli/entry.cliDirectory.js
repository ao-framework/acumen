"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suite_cli_1 = require("./suite.cli");
const suite_loader_1 = require("./suite.loader");
class EntryCliDirectory {
    constructor() {
        this.suites = [
            suite_cli_1.SuiteCli,
            suite_loader_1.SuiteLoader
        ];
    }
    async controller({ suite, faker }) {
        return Promise.resolve()
            .then(() => suite(suite_cli_1.SuiteCli))
            .then(() => suite(suite_loader_1.SuiteLoader));
    }
}
exports.EntryCliDirectory = EntryCliDirectory;
//# sourceMappingURL=entry.cliDirectory.js.map