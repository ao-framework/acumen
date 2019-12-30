"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatCode_1 = require("../../src/commons/formatCode");
class SuiteFormatCode {
    constructor() {
        this.descriptions = {
            suite: "handles all functions in the formatCode file",
            formatCodeTest: "it should be able to call prettier without breaking"
        };
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => test(this.formatCodeTest));
    }
    /**
      * No need to test extensively. The prettier library should be
      * taking care of this for us.
      */
    formatCodeTest({ expect, warning }) {
        const formatted = `function name() {}\n`;
        const string = formatCode_1.formatCode("function name() {}");
        expect(string).equal(formatted);
        if (string !== formatted) {
            warning("Code was not formatted correctly", string);
        }
    }
}
exports.SuiteFormatCode = SuiteFormatCode;
//# sourceMappingURL=suite.formatCode.js.map