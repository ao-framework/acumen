"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entryLogic_1 = require("./entryLogic");
class EntryFile {
    /**
     * Creates the instance of the entry file and sets the relevant
     * properties for the consumption of all sub components
     * @param entry
     * @param currentWorkingDirectory
     */
    constructor(entry, currentWorkingDirectory) {
        /**
         * Whether or not this entry file is
         * loading or reloading its schema
         */
        this.schemaLoading = true;
        /**
         * Whether or not this entry file is
         * loading or reloading its snapshot
         */
        this.snapshotLoading = true;
        /**
         * Whether or not this entry file is
         * loading or reloading its coverage
         */
        this.coverageLoading = true;
        /**
         * The data for the entry's current schema
         */
        this.schema = null;
        /**
         * The data for the entry's current snaphsot
         */
        this.snapshot = null;
        /**
         * The data for the entry's current coverage report
         */
        this.coverage = null;
        this.path = entry;
        this.shortPath = entryLogic_1.getShortPath(entry, currentWorkingDirectory);
        this.base64 = entryLogic_1.getBase64(entry);
    }
}
exports.EntryFile = EntryFile;
//# sourceMappingURL=entryFile.js.map