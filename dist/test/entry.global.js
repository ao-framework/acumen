"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_cliDirectory_1 = require("./cli/entry.cliDirectory");
const entry_commonsDirectory_1 = require("./commons/entry.commonsDirectory");
const entry_coreDirectory_1 = require("./core/entry.coreDirectory");
class EntryGlobal {
    constructor() {
        this.suites = [
            entry_cliDirectory_1.EntryCliDirectory,
            entry_commonsDirectory_1.EntryCommonsDirectory,
            entry_coreDirectory_1.EntryCoreDirectory
        ];
    }
    async controller({ suite }) {
        return Promise.resolve()
            .then(() => suite(entry_cliDirectory_1.EntryCliDirectory))
            .then(() => suite(entry_commonsDirectory_1.EntryCommonsDirectory))
            .then(() => suite(entry_coreDirectory_1.EntryCoreDirectory));
    }
}
exports.EntryGlobal = EntryGlobal;
//# sourceMappingURL=entry.global.js.map