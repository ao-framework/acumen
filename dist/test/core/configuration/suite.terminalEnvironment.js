"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuiteTerminalEnvironment {
    constructor() {
        this.suites = [];
    }
    async controller({ suite, test }) {
        return Promise.resolve();
    }
}
exports.SuiteTerminalEnvironment = SuiteTerminalEnvironment;
//# sourceMappingURL=suite.terminalEnvironment.js.map