import { whenNotFunction, whenNotObject } from "../commons/coolKids";
import { isFileOrFail, relativeToProject } from "../commons/filesystemValidators";
import { bootEnvironment } from "../core/bootEnvironment";
import { TestEnvironment } from "../core/configuration/testEnvironment";

export class Cli {

    /**
     * Holds the location of the node executable
     */
    public nodeExecutable: string;

    /**
     * The file location of the script
     */
    public scriptLocation: string;

    /**
     * The concept to be executed.
     */
    public concept: string;

    /**
     * The arguments passed via the command line
     */
    public args: string[];

    /**
     * Creates the instance of the cli
     * @param argv The list of arguments from process.argv
     * @param commands Key value mapping --command:controller
     */
    public constructor(argv: string[]) {
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
    public hasConfigFile(configFile: string = relativeToProject("acumen.config.js")) {
        isFileOrFail(configFile, `To use the Acumen cli, the "acumen.config.js" must exist in the root directory of you project`);
        return configFile;
    }

    /**
     * It will attempt to require the config file. It will throw an exception if the module.exports
     * is set to the wrong type and if the object instance does not have a member called concepts
     */
    public getConcepts() {
        const path = this.hasConfigFile()
        const instance = require(path);
        whenNotObject(instance, `The "acumen.config.js" file exports the wrong type. It must be an object`);
        whenNotObject(instance.concepts, `The object export by "acumen.config.js" must have a member called concepts`);
        return instance.concepts;
    }

    /**
     * It will attempt to return the concept function for the command from the command line
     */
    public getConcept() {
        const concepts = this.getConcepts();
        whenNotFunction(concepts[this.concept], `The concept "${this.concept}" does not exist.`)
        return concepts[this.concept];
    }

    /**
     * It will attempt to orchestra getting the config, the concept, calling the 
     * concept, and booting the environment into the kernel
     */
    public callConcept() {
        const concept = this.getConcept();
        const environment = new TestEnvironment();
        concept(environment);
        bootEnvironment(environment);
    }
}
