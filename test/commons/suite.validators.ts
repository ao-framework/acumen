import { Apparatus } from "../../src";
import { isArray, isNill, isNull, isObject, isObjectLike, isUndefined } from "../../src/commons/validators";

export class SuiteValidators {

    public descriptions = {
        suite: "Handles all functions in the validators file",
        isNullTest: "it should be able to tell if a variable is null",
        isUndefinedTest: "it should be able to tell if a variable is undefined",
        isNillTest: "it should be able to tell if a variable is undefined or null",
        isObjectLikeTest: "it should be able to tell if a variable is an array or object",
        isArrayTest: "it should be able to tell if a variable is an array",
        isObjectTest: "it should be able to tell if a variable is an object --key/value pair"
    }

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.isNullTest))
            .then(() => test(this.isUndefinedTest))
            .then(() => test(this.isNillTest))
            .then(() => test(this.isObjectLikeTest))
            .then(() => test(this.isArrayTest))
            .then(() => test(this.isObjectTest))
    }

    public isNullTest({ expect }: Apparatus) {
        expect(isNull(null)).equal(true);
        expect(isNull(false)).equal(false);
    }

    public isUndefinedTest({ expect }: Apparatus) {
        expect(isUndefined(undefined)).equal(true);
        expect(isUndefined(true)).equal(false);
    }

    public isNillTest({ expect }: Apparatus) {
        expect(isNill(undefined)).equal(true)
        expect(isNill(null)).equal(true)
        expect(isNill(false)).equal(false);
    }

    public isObjectLikeTest({ expect }: Apparatus) {
        expect(isObjectLike({})).equal(true)
        expect(isObjectLike([])).equal(true)
        expect(isObjectLike(null)).equal(false)
    }

    public isArrayTest({ expect }: Apparatus) {
        expect(isArray([])).equal(true);
        expect(isArray({})).equal(false)
    }

    public isObjectTest({ expect }: Apparatus) {
        expect(isObject({})).equal(true)
        expect(isObject([])).equal(false)
    }
}
