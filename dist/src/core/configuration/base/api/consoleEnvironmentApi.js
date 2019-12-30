"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleEnvironmentApi {
    constructor(console) {
        this.console = console;
    }
    throwWhenErrorsPresent(use) {
        this.console.throwWhenErrorsPresent = use;
        return this;
    }
    useAnsiColors(use) {
        this.console.useAnsiColors = use;
        return this;
    }
    useStructureGuideLines(use) {
        this.console.useStructureGuideLines = use;
        return this;
    }
    mode(type) {
        this.console.loggingMode = type;
        return this;
    }
    lineDelimiter(delimiter) {
        this.console.lineDelimiter = delimiter;
        return this;
    }
    intercept(handler) {
        this.console.messageHandler = handler;
        return this;
    }
}
exports.ConsoleEnvironmentApi = ConsoleEnvironmentApi;
//# sourceMappingURL=consoleEnvironmentApi.js.map