"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const environmentApi_1 = require("../base/api/environmentApi");
const markdownEnvironment_1 = require("../markdownEnvironment");
class MarkdownEnvironmentApi extends environmentApi_1.EnvironmentApi {
    /**
     * Provide a path to a file, relative to your current working directory, as an argument.
     * When schema information is provided, documentation detailing the your test's schema will be
     * generated in that file. Optionally if you would like to alter the contents of the file
     * before they are written to disk, provide a callback to alter the contents. The callbacks first
     * argument will be an array of strings that represents the each line of the file. Whatever you alter
     * in the array will be written to disk.
     * @param directory
     * @param contentsHandler
     */
    documentSchema(path, contentsHandler) {
        const options = new markdownEnvironment_1.MarkdownOptions();
        options.path = coolKids_1.stringOrNothing(path);
        options.contentsHandler = coolKids_1.functionOrNothing(contentsHandler);
        this.environment.schemaOptions = options;
    }
    /**
     * Provide a path to a file, relative to your current working directory, as an argument.
     * When snapshot information is provided, documentation detailing the your test's snapshot will be
     * generated in that file. Optionally if you would like to alter the contents of the file
     * before they are written to disk, provide a callback to alter the contents. The callbacks first
     * argument will be an array of strings that represents the each line of the file. Whatever you alter
     * in the array will be written to disk.
     * @param directory
     * @param contentsHandler
     */
    documentSnapshot(path, contentsHandler) {
        const options = new markdownEnvironment_1.MarkdownOptions();
        options.path = coolKids_1.stringOrNothing(path);
        options.contentsHandler = coolKids_1.functionOrNothing(contentsHandler);
        this.environment.snapshotOptions = options;
    }
    /**
      * Provide a path to a file, relative to your current working directory, as an argument.
      * When snapshot information is provided, documentation detailing the your test's snapshot will be
      * generated in that file. Optionally if you would like to alter the contents of the file
      * before they are written to disk, provide a callback to alter the contents. The callbacks first
      * argument will be an array of strings that represents the each line of the file. Whatever you alter
      * in the array will be written to disk.
      * @param directory
      * @param contentsHandler
      */
    documentCoverage(path, contentsHandler) {
        const options = new markdownEnvironment_1.MarkdownOptions();
        options.path = coolKids_1.stringOrNothing(path);
        options.contentsHandler = coolKids_1.functionOrNothing(contentsHandler);
        this.environment.coverageOptions = options;
    }
}
exports.MarkdownEnvironmentApi = MarkdownEnvironmentApi;
//# sourceMappingURL=markdownEnvironmentApi.js.map