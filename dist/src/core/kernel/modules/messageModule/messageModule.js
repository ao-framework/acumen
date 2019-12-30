"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filters_1 = require("../../../processor/filters");
const ansiFormatter_1 = require("./ansiFormatter");
class MessageModule {
    /**
     * Provide the kernel modules as an argument. It will
     * construct the instance of the MessageModule.
     */
    constructor(modules) {
        this.modules = modules;
    }
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as information.
     * @param environment
     * @param lines
     */
    info(environment, lines) {
        lines = filters_1.filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines);
        environment.console.messageHandler("info", message);
    }
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as a warning.
     * @param environment
     * @param lines
     */
    warning(environment, lines) {
        lines = filters_1.filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines);
        environment.console.messageHandler("warning", message);
    }
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as an error.
     * @param environment
     * @param lines
     */
    error(environment, lines) {
        lines = filters_1.filterLines(lines);
        const message = environment.console.useAnsiColors ?
            this.ansiLines(environment, lines) :
            this.stripLines(environment, lines);
        environment.console.messageHandler("error", message);
        if (environment.console.throwWhenErrorsPresent) {
            console.error("Environment is required to throw when errors are present.");
            process.exit(1);
        }
    }
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings only if
     * verbose logging is turned on.
     * @param environment
     * @param lines
     */
    verbose(environment, lines) {
        lines = filters_1.filterLines(lines);
        if (environment.console.loggingMode === "verbose") {
            const message = environment.console.useAnsiColors ?
                this.ansiLines(environment, lines) :
                this.stripLines(environment, lines);
            environment.console.messageHandler("verbose", message);
        }
    }
    /**
     * Provide the enviroment and a list lines as arguments. It will join
     * the lines together using the delimiter in the environment settings
     * @param environment
     * @param lines
     */
    join(environment, lines) {
        return lines.join(environment.console.lineDelimiter);
    }
    /**
     * Provide environment and a list of lines as arguments. It will strip
     * all xml ansi element tags from the lines.
     * @param environment
     * @param lines
     */
    stripLines(environment, lines) {
        return this.join(environment, lines)
            .replace(/\<\/(.*?)\>/g, (match, tagName) => ansiFormatter_1.stripClosingTag(tagName))
            .replace(/\<(.*?)\>/g, (match, tagName) => ansiFormatter_1.stripOpenTag(tagName));
    }
    /**
     * Provide environment and a list of lines as arguments. It will convert
     * all xml ansi element tags to fully qualified ansi characters.
     * @param environment
     * @param lines
     */
    ansiLines(environment, lines) {
        return this.join(environment, lines)
            .replace(/\<\/(.*?)\>/g, (match, tagName) => ansiFormatter_1.closeTag(tagName))
            .replace(/\<(.*?)\>/g, (match, tagName) => ansiFormatter_1.openTag(tagName));
    }
}
exports.MessageModule = MessageModule;
//# sourceMappingURL=messageModule.js.map