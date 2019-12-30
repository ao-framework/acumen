"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../src/commons/validators");
class SuiteValidators {
    constructor() {
        this.descriptions = {
            suite: "Handles all functions in the validators file",
            isNullTest: "it should be able to tell if a variable is null",
            isUndefinedTest: "it should be able to tell if a variable is undefined",
            isNillTest: "it should be able to tell if a variable is undefined or null",
            isObjectLikeTest: "it should be able to tell if a variable is an array or object",
            isArrayTest: "it should be able to tell if a variable is an array",
            isObjectTest: "it should be able to tell if a variable is an object --key/value pair"
        };
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => test(this.isNullTest))
            .then(() => test(this.isUndefinedTest))
            .then(() => test(this.isNillTest))
            .then(() => test(this.isObjectLikeTest))
            .then(() => test(this.isArrayTest))
            .then(() => test(this.isObjectTest));
    }
    isNullTest({ expect }) {
        expect(validators_1.isNull(null)).equal(true);
        expect(validators_1.isNull(false)).equal(false);
    }
    isUndefinedTest({ expect }) {
        expect(validators_1.isUndefined(undefined)).equal(true);
        expect(validators_1.isUndefined(true)).equal(false);
    }
    isNillTest({ expect }) {
        expect(validators_1.isNill(undefined)).equal(true);
        expect(validators_1.isNill(null)).equal(true);
        expect(validators_1.isNill(false)).equal(false);
    }
    isObjectLikeTest({ expect }) {
        expect(validators_1.isObjectLike({})).equal(true);
        expect(validators_1.isObjectLike([])).equal(true);
        expect(validators_1.isObjectLike(null)).equal(false);
    }
    isArrayTest({ expect }) {
        expect(validators_1.isArray([])).equal(true);
        expect(validators_1.isArray({})).equal(false);
    }
    isObjectTest({ expect }) {
        expect(validators_1.isObject({})).equal(true);
        expect(validators_1.isObject([])).equal(false);
    }
}
exports.SuiteValidators = SuiteValidators;
//# sourceMappingURL=suite.validators.js.map