import { Environment } from "../../../configuration/base/environment";
import { filterLines } from "../../../processor/filters";
import { KernelModules } from "../../kernelModules";
import { closeTag, openTag, stripClosingTag, stripOpenTag } from "./ansiFormatter";

export class MessageModule {

    /**
     * Provide the kernel modules as an argument. It will
     * construct the instance of the MessageModule.
     */
    public constructor(private modules: KernelModules) { }

    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as information.
     * @param environment 
     * @param lines 
     */
    public info(environment: Environment, lines: string[]) {
        lines = filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines)
        environment.console.messageHandler("info", message);
    }

    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as a warning.
     * @param environment 
     * @param lines 
     */
    public warning(environment: Environment, lines: string[]) {
        lines = filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines)
        environment.console.messageHandler("warning", message);
    }

    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as an error.
     * @param environment 
     * @param lines 
     */
    public error(environment: Environment, lines: string[]) {
        lines = filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines)
        environment.console.messageHandler("error", message);
        if (environment.console.throwWhenErrorsPresent) {
            console.error("Environment is required to throw when errors are present.");
            process.exit(1)
        }
    }

    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings only if
     * verbose logging is turned on.
     * @param environment 
     * @param lines 
     */
    public verbose(environment: Environment, lines: string[]) {
        lines = filterLines(lines);
        if (environment.console.loggingMode === "verbose") {
            const message = environment.console.useAnsiColors ?
                this.ansiLines(environment, lines) :
                this.stripLines(environment, lines)
            environment.console.messageHandler("verbose", message);
        }
    }

    /**
     * Provide the enviroment and a list lines as arguments. It will join
     * the lines together using the delimiter in the environment settings
     * @param environment 
     * @param lines 
     */
    public join(environment: Environment, lines: string[]) {
        return lines.join(environment.console.lineDelimiter);
    }

    /**
     * Provide environment and a list of lines as arguments. It will strip
     * all xml ansi element tags from the lines.
     * @param environment 
     * @param lines 
     */
    public stripLines(environment: Environment, lines: string[]) {
        return this.join(environment, lines)
            .replace(/\<\/(.*?)\>/g, (match, tagName) => stripClosingTag(tagName))
            .replace(/\<(.*?)\>/g, (match, tagName) => stripOpenTag(tagName))
    }

    /**
     * Provide environment and a list of lines as arguments. It will convert
     * all xml ansi element tags to fully qualified ansi characters.
     * @param environment 
     * @param lines 
     */
    public ansiLines(environment: Environment, lines: string[]) {
        return this.join(environment, lines)
            .replace(/\<\/(.*?)\>/g, (match, tagName) => closeTag(tagName))
            .replace(/\<(.*?)\>/g, (match, tagName) => openTag(tagName))
    }
}
