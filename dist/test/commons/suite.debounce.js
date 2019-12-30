"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debounce_1 = require("../../src/commons/debounce");
class SuiteDebounce {
    constructor() {
        this.descriptions = {
            suite: "handles all functions in the debounce file",
            doDebounceTest: "it should be able to do debouncing"
        };
    }
    async controller({ test }) {
        return Promise.resolve()
            .then(() => test(this.doDebounceTest));
    }
    async doDebounceTest({ expect, spotlight, warning }) {
        let count = 0;
        const context = { name: "something" };
        const fn = debounce_1.debounce(context, function () {
            expect(this.name).equal("something");
            if (this !== context) {
                warning("context was not correct", context);
            }
            count++;
        }, 100);
        fn();
        fn();
        fn();
        expect(typeof fn).equal("function");
        return new Promise((done, error) => {
            setTimeout(() => {
                expect(count).equal(1);
                if (count !== 1) {
                    warning("count was not one", count);
                }
                done();
            }, 200);
        });
    }
}
exports.SuiteDebounce = SuiteDebounce;
//# sourceMappingURL=suite.debounce.js.map