"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
class SuiteMarkdownEnvironment {
    constructor() {
        this.suites = [];
    }
    async controller({ suite, test }) {
        return Promise.resolve();
    }
    defaultSettings({ expect, spotlight, beforeThrowing }) {
        beforeThrowing(() => {
        });
        const markdown = new src_1.MarkdownEnvironment();
    }
}
exports.SuiteMarkdownEnvironment = SuiteMarkdownEnvironment;
//# sourceMappingURL=suite.markdownEnvironment.js.map