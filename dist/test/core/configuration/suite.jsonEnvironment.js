"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const consoleEnvironment_1 = require("../../../src/core/configuration/base/consoleEnvironment");
const repoEnvironment_1 = require("../../../src/core/configuration/base/repoEnvironment");
class SuiteJsonEnvironment {
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => test(this.defaultSettings));
    }
    defaultSettings({ expect, spotlight, beforeThrowing }) {
        beforeThrowing(() => {
            spotlight("json", json);
        });
        const json = new src_1.JsonEnvironment();
        expect(json.whenCoverage).equal(undefined);
        expect(json.whenSchema).equal(undefined);
        expect(json.whenSnapshot).equal(undefined);
        expect(json.repo instanceof repoEnvironment_1.RepoEnvironment).equal(true);
        expect(json.console instanceof consoleEnvironment_1.ConsoleEnvironment).equal(true);
    }
}
exports.SuiteJsonEnvironment = SuiteJsonEnvironment;
//# sourceMappingURL=suite.jsonEnvironment.js.map