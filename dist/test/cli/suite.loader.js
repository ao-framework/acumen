"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuiteLoader {
    constructor() {
        this.suites = [];
    }
    async controller({ suite, test }) {
        return Promise.resolve();
    }
}
exports.SuiteLoader = SuiteLoader;
//# sourceMappingURL=suite.loader.js.map