"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suite_coolKids_1 = require("./suite.coolKids");
const suite_debounce_1 = require("./suite.debounce");
const suite_filesystemValidators_1 = require("./suite.filesystemValidators");
const suite_formatCode_1 = require("./suite.formatCode");
const suite_helpers_1 = require("./suite.helpers");
const suite_processors_1 = require("./suite.processors");
const suite_queue_1 = require("./suite.queue");
const suite_validators_1 = require("./suite.validators");
const suite_variableDiagram_1 = require("./suite.variableDiagram");
const suite_watchers_1 = require("./suite.watchers");
class EntryCommonsDirectory {
    constructor() {
        this.descriptions = {
            suite: "Main entry point for the commons directory"
        };
        this.suites = [
            suite_coolKids_1.SuiteCoolKids,
            suite_debounce_1.SuiteDebounce,
            suite_filesystemValidators_1.SuiteFilesystemValidators,
            suite_formatCode_1.SuiteFormatCode,
            suite_helpers_1.SuiteHelpers,
            suite_processors_1.SuiteProcessors,
            suite_queue_1.SuiteQueue,
            suite_validators_1.SuiteValidators,
            suite_variableDiagram_1.SuiteVariableDiagram,
            suite_watchers_1.SuiteWatchers
        ];
    }
    async controller({ suite, expect }) {
        return Promise.resolve()
            .then(() => suite(suite_coolKids_1.SuiteCoolKids))
            .then(() => suite(suite_debounce_1.SuiteDebounce))
            .then(() => suite(suite_filesystemValidators_1.SuiteFilesystemValidators))
            .then(() => suite(suite_formatCode_1.SuiteFormatCode))
            .then(() => suite(suite_helpers_1.SuiteHelpers))
            .then(() => suite(suite_processors_1.SuiteProcessors))
            .then(() => suite(suite_queue_1.SuiteQueue))
            .then(() => suite(suite_validators_1.SuiteValidators))
            .then(() => suite(suite_variableDiagram_1.SuiteVariableDiagram))
            .then(() => suite(suite_watchers_1.SuiteWatchers));
    }
}
exports.EntryCommonsDirectory = EntryCommonsDirectory;
//# sourceMappingURL=entry.commonsDirectory.js.map