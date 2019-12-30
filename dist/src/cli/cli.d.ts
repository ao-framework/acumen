export declare class Cli {
    /**
     * Holds the location of the node executable
     */
    nodeExecutable: string;
    /**
     * The file location of the script
     */
    scriptLocation: string;
    /**
     * The concept to be executed.
     */
    concept: string;
    /**
     * The arguments passed via the command line
     */
    args: string[];
    /**
     * Creates the instance of the cli
     * @param argv The list of arguments from process.argv
     * @param commands Key value mapping --command:controller
     */
    constructor(argv: string[]);
    /**
     * Provide an optional config file path as an argument. If one is not provided, the function
     * will assume the current working directory's location with the config file naming convention.
     * It will either find the file and return the path or throw an exception.
     * @param configFile
     */
    hasConfigFile(configFile?: string): string;
    /**
     * It will attempt to require the config file. It will throw an exception if the module.exports
     * is set to the wrong type and if the object instance does not have a member called concepts
     */
    getConcepts(): any;
    /**
     * It will attempt to return the concept function for the command from the command line
     */
    getConcept(): any;
    /**
     * It will attempt to orchestra getting the config, the concept, calling the
     * concept, and booting the environment into the kernel
     */
    callConcept(): void;
}
