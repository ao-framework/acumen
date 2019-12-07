

export class ConsoleEnvironment {

    /**
     * In the build process, it is important to blow
     * when errors are present to alert of failure
     */
    public throwWhenErrorsPresent: boolean = false;

    /**
     * Whether or not to use Ansi colors when 
     * logging to the terminal
     */
    public useAnsiColors: boolean = true;

    /**
    * Whether or not to include structure guide lines
    * in the output of schemas, snapshots, and coverage
    */
    public useStructureGuideLines: boolean = true;

    /**
     * Whether to go crazy with the console.logging
     * or not.
     */
    public loggingMode: "simple" | "verbose" = "simple";

    /**
     * The line delimiter character so that
     * the developer can customize that as well
     */
    public lineDelimiter: string = "\n";

    /**
     * Handles sending the message to the developer.
     * This exists here so the developer can fine grain
     * handle where messages get consoled.
     */
    public messageHandler: (type: string, message: string) => any = (type, message) => { console.log(message); };

}
