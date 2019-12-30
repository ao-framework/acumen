"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleEnvironment {
    constructor() {
        /**
         * In the build process, it is important to blow
         * when errors are present to alert of failure
         */
        this.throwWhenErrorsPresent = false;
        /**
         * Whether or not to use Ansi colors when
         * logging to the terminal
         */
        this.useAnsiColors = true;
        /**
        * Whether or not to include structure guide lines
        * in the output of schemas, snapshots, and coverage
        */
        this.useStructureGuideLines = true;
        /**
         * Whether to go crazy with the console.logging
         * or not.
         */
        this.loggingMode = "simple";
        /**
         * The line delimiter character so that
         * the developer can customize that as well
         */
        this.lineDelimiter = "\n";
        /**
         * Handles sending the message to the developer.
         * This exists here so the developer can fine grain
         * handle where messages get consoled.
         */
        this.messageHandler = (type, message) => { console.log(message); };
    }
}
exports.ConsoleEnvironment = ConsoleEnvironment;
//# sourceMappingURL=consoleEnvironment.js.map