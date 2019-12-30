import { ConsoleEnvironment } from "../consoleEnvironment";
export declare class ConsoleEnvironmentApi {
    private console;
    constructor(console: ConsoleEnvironment);
    throwWhenErrorsPresent(use: boolean): this;
    useAnsiColors(use: boolean): this;
    useStructureGuideLines(use: boolean): this;
    mode(type: "simple" | "verbose"): this;
    lineDelimiter(delimiter: string): this;
    intercept(handler: (type: string, message: string) => any): this;
}
