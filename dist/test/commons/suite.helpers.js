"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../src/commons/helpers");
class SuiteHelpers {
    constructor() {
        this.descriptions = {
            suite: "handles all functions in the helpers file",
            getMethodNamesTest: "it should be able to return all methods from an instance of a class"
        };
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => test(this.getMethodNamesTest));
    }
    getMethodNamesTest({ expect, warning, beforeThrowing }) {
        const list = helpers_1.getMethodNames(this);
        beforeThrowing(() => warning("something happened", list));
        expect(list.includes("controller")).equals(true);
        expect(list.includes("getMethodNamesTest")).equals(true);
    }
}
exports.SuiteHelpers = SuiteHelpers;
//# sourceMappingURL=suite.helpers.js.map