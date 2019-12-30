export declare class ConsoleEnvironment {
    /**
     * In the build process, it is important to blow
     * when errors are present to alert of failure
     */
    throwWhenErrorsPresent: boolean;
    /**
     * Whether or not to use Ansi colors when
     * logging to the terminal
     */
    useAnsiColors: boolean;
    /**
    * Whether or not to include structure guide lines
    * in the output of schemas, snapshots, and coverage
    */
    useStructureGuideLines: boolean;
    /**
     * Whether to go crazy with the console.logging
     * or not.
     */
    loggingMode: "simple" | "verbose";
    /**
     * The line delimiter character so that
     * the developer can customize that as well
     */
    lineDelimiter: string;
    /**
     * Handles sending the message to the developer.
     * This exists here so the developer can fine grain
     * handle where messages get consoled.
     */
    messageHandler: (type: string, message: string) => any;
}
