"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_configurationDirectory_1 = require("./configuration/entry.configurationDirectory");
class EntryCoreDirectory {
    constructor() {
        this.suites = [
            entry_configurationDirectory_1.EntryConfigurationDirectory
        ];
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => suite(entry_configurationDirectory_1.EntryConfigurationDirectory));
    }
}
exports.EntryCoreDirectory = EntryCoreDirectory;
//# sourceMappingURL=entry.coreDirectory.js.map