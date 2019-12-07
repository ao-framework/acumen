import { ConsoleEnvironment } from "../consoleEnvironment";

export class ConsoleEnvironmentApi {

    public constructor(private console: ConsoleEnvironment) { }

    public throwWhenErrorsPresent(use: boolean) {
        this.console.throwWhenErrorsPresent = use;
        return this;
    }

    public useAnsiColors(use: boolean) {
        this.console.useAnsiColors = use;
        return this;
    }

    public useStructureGuideLines(use: boolean) {
        this.console.useStructureGuideLines = use
        return this;
    }

    public mode(type: "simple" | "verbose") {
        this.console.loggingMode = type;
        return this;
    }

    public lineDelimiter(delimiter: string) {
        this.console.lineDelimiter = delimiter;
        return this;
    }

    public intercept(handler: (type: string, message: string) => any) {
        this.console.messageHandler = handler;
        return this;
    }
}
