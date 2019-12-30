"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../commons/coolKids");
const filesystemValidators_1 = require("../commons/filesystemValidators");
const bootEnvironment_1 = require("../core/bootEnvironment");
const testEnvironment_1 = require("../core/configuration/testEnvironment");
class Cli {
    /**
     * Creates the instance of the cli
     * @param argv The list of arguments from process.argv
     * @param commands Key value mapping --command:controller
     */
    constructor(argv) {
        const [nodeExecutable, scriptLocation, concept, ...args] = argv;
        this.nodeExecutable = nodeExecutable;
        this.scriptLocation = scriptLocation;
        this.concept = concept;
        this.args = args;
    }
    /**
     * Provide an optional config file path as an argument. If one is not provided, the function
     * will assume the current working directory's location with the config file naming convention.
     * It will either find the file and return the path or throw an exception.
     * @param configFile
     */
    hasConfigFile(configFile = filesystemValidators_1.relativeToProject("acumen.config.js")) {
        filesystemValidators_1.isFileOrFail(configFile, `To use the Acumen cli, the "acumen.config.js" must exist in the root directory of you project`);
        return configFile;
    }
    /**
     * It will attempt to require the config file. It will throw an exception if the module.exports
     * is set to the wrong type and if the object instance does not have a member called concepts
     */
    getConcepts() {
        const path = this.hasConfigFile();
        const instance = require(path);
        coolKids_1.whenNotObject(instance, `The "acumen.config.js" file exports the wrong type. It must be an object`);
        coolKids_1.whenNotObject(instance.concepts, `The object export by "acumen.config.js" must have a member called concepts`);
        return instance.concepts;
    }
    /**
     * It will attempt to return the concept function for the command from the command line
     */
    getConcept() {
        const concepts = this.getConcepts();
        coolKids_1.whenNotFunction(concepts[this.concept], `The concept "${this.concept}" does not exist.`);
        return concepts[this.concept];
    }
    /**
     * It will attempt to orchestra getting the config, the concept, calling the
     * concept, and booting the environment into the kernel
     */
    callConcept() {
        const concept = this.getConcept();
        const environment = new testEnvironment_1.TestEnvironment();
        concept(environment);
        bootEnvironment_1.bootEnvironment(environment);
    }
}
exports.Cli = Cli;
//# sourceMappingURL=cli.js.map