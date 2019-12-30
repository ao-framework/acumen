"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuiteServerEnvironment {
    constructor() {
        this.suites = [];
    }
    async controller({ suite, test }) {
        return Promise.resolve();
    }
}
exports.SuiteServerEnvironment = SuiteServerEnvironment;
//# sourceMappingURL=suite.serverEnvironment.js.map