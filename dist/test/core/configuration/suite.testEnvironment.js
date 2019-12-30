"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuiteTestEnvironment {
    constructor() {
        this.suites = [];
    }
    async controller({ suite, test, parallel }) {
        return Promise.resolve();
    }
}
exports.SuiteTestEnvironment = SuiteTestEnvironment;
//# sourceMappingURL=suite.testEnvironment.js.map