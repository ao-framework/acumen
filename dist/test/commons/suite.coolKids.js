"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../src/commons/coolKids");
class SuiteCoolKids {
    constructor() {
        this.descriptions = {
            suite: "Handles testing all functions in the coolKids file",
            ensureObjectTest: "the ensureObject function should always return an object",
            ensureArrayTest: "the ensureArray function should always return an array",
            whenFunctionTest: "the whenFunction function should only fire when a function is provided",
            whenTrueTest: "the whenTrue function should only fire when the condition is met",
            whenNotStringTest: "it should throw when there is not string and return the string when there is one",
            whenStringVoidOfCharactersTest: "it should throw when a strings length is zero but return the string when greater",
            stringOrNothingTest: "it should return undefined when not given a string but return the string when present",
            functionOrNothingTest: "it should return the function if given a function --undefined if not",
            numberOrDefaultTest: "it should return the number if present --the default number if not"
        };
    }
    async controller({ test }) {
        return Promise.resolve()
            .then(() => test(this.ensureObjectTest))
            .then(() => test(this.ensureArrayTest))
            .then(() => test(this.whenFunctionTest))
            .then(() => test(this.whenTrueTest))
            .then(() => test(this.whenNotStringTest))
            .then(() => test(this.whenStringVoidOfCharactersTest))
            .then(() => test(this.stringOrNothingTest))
            .then(() => test(this.functionOrNothingTest))
            .then(() => test(this.numberOrDefaultTest));
    }
    ensureObjectTest({ expect, spotlight, faker, beforeThrowing }) {
        beforeThrowing(() => {
            spotlight("default options", goodDefault);
            spotlight("bad default", badDefault);
            spotlight("good options", goodOptions);
            spotlight("bad options", badOptions);
            spotlight("good ensure", goodEnsure);
            spotlight("bad ensure", badEnsure);
        });
        const goodDefault = { name: faker.name.firstName() };
        const badDefault = { name: faker.name.firstName() };
        const goodOptions = { name: "321654987" };
        const badOptions = null;
        const goodEnsure = coolKids_1.ensureObject(goodOptions, goodDefault);
        const badEnsure = coolKids_1.ensureObject(badOptions, badDefault);
        expect(goodEnsure.name).equals(goodOptions.name);
        expect(badEnsure.name).equals(badDefault.name);
    }
    ensureArrayTest({ expect, spotlight, beforeThrowing }) {
        beforeThrowing(() => {
            spotlight("default options", goodDefault);
            spotlight("bad default", badDefault);
            spotlight("good options", goodOptions);
            spotlight("bad options", badOptions);
            spotlight("good ensure", goodEnsure);
            spotlight("bad ensure", badEnsure);
        });
        const goodDefault = ["one", "two"];
        const badDefault = ["one", "two"];
        const goodOptions = ["three"];
        const badOptions = null;
        const goodEnsure = coolKids_1.ensureArray(goodOptions, goodDefault);
        const badEnsure = coolKids_1.ensureArray(badOptions, badDefault);
        expect(goodEnsure[0]).equals("three");
        expect(goodEnsure[1]).equals("two");
        expect(badEnsure[0]).equals("one");
        expect(badEnsure[1]).equals("two");
    }
    whenFunctionTest({ expect }) {
        let counter = 0;
        coolKids_1.whenFunction(() => counter++)();
        coolKids_1.whenFunction(null)();
        expect(counter).equals(1);
    }
    whenTrueTest({ expect }) {
        let counter = 0;
        coolKids_1.whenTrue(true)(() => counter++);
        coolKids_1.whenTrue(false)(() => counter++);
        expect(counter).equals(1);
    }
    whenNotStringTest({ expect }) {
        expect(() => coolKids_1.whenNotString(null, "bad message")).to.throw("bad message");
        expect(coolKids_1.whenNotString("something", "??")).equal("something");
    }
    whenStringVoidOfCharactersTest({ expect }) {
        expect(() => coolKids_1.whenStringVoidOfCharacters("", "bad message")).to.throw("bad message");
        expect(coolKids_1.whenStringVoidOfCharacters("something", "??")).equal("something");
    }
    stringOrNothingTest({ expect }) {
        expect(coolKids_1.stringOrNothing(null)).equal(undefined);
        expect(coolKids_1.stringOrNothing("something")).equal("something");
    }
    functionOrNothingTest({ expect }) {
        const handler = () => { };
        expect(coolKids_1.functionOrNothing(null)).equal(undefined);
        expect(coolKids_1.functionOrNothing(handler)).equal(handler);
    }
    numberOrDefaultTest({ expect }) {
        expect(coolKids_1.numberOrDefault(null, 3)).equal(3);
        expect(coolKids_1.numberOrDefault(2, 3)).equal(2);
    }
}
exports.SuiteCoolKids = SuiteCoolKids;
//# sourceMappingURL=suite.coolKids.js.map