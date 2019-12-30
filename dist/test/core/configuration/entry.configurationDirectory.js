"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suite_jsonEnvironment_1 = require("./suite.jsonEnvironment");
const suite_markdownEnvironment_1 = require("./suite.markdownEnvironment");
const suite_serverEnvironment_1 = require("./suite.serverEnvironment");
const suite_terminalEnvironment_1 = require("./suite.terminalEnvironment");
const suite_testEnvironment_1 = require("./suite.testEnvironment");
class EntryConfigurationDirectory {
    constructor() {
        this.suites = [
            suite_jsonEnvironment_1.SuiteJsonEnvironment,
            suite_markdownEnvironment_1.SuiteMarkdownEnvironment,
            suite_serverEnvironment_1.SuiteServerEnvironment,
            suite_terminalEnvironment_1.SuiteTerminalEnvironment,
            suite_testEnvironment_1.SuiteTestEnvironment
        ];
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => suite(suite_jsonEnvironment_1.SuiteJsonEnvironment))
            .then(() => suite(suite_markdownEnvironment_1.SuiteMarkdownEnvironment))
            .then(() => suite(suite_serverEnvironment_1.SuiteServerEnvironment))
            .then(() => suite(suite_terminalEnvironment_1.SuiteTerminalEnvironment))
            .then(() => suite(suite_testEnvironment_1.SuiteTestEnvironment));
    }
}
exports.EntryConfigurationDirectory = EntryConfigurationDirectory;
//# sourceMappingURL=entry.configurationDirectory.js.map