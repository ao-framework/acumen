import { Apparatus } from "../../src";
import { ensureArray, ensureObject, functionOrNothing, numberOrDefault, stringOrNothing, whenFunction, whenNotString, whenStringVoidOfCharacters, whenTrue } from "../../src/commons/coolKids";

export class SuiteCoolKids {

    public descriptions = {
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
    }

    public async controller({ test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.ensureObjectTest))
            .then(() => test(this.ensureArrayTest))
            .then(() => test(this.whenFunctionTest))
            .then(() => test(this.whenTrueTest))
            .then(() => test(this.whenNotStringTest))
            .then(() => test(this.whenStringVoidOfCharactersTest))
            .then(() => test(this.stringOrNothingTest))
            .then(() => test(this.functionOrNothingTest))
            .then(() => test(this.numberOrDefaultTest))
    }

    public ensureObjectTest({ expect, spotlight, faker, beforeThrowing }: Apparatus) {
        beforeThrowing(() => {
            spotlight("default options", goodDefault)
            spotlight("bad default", badDefault)
            spotlight("good options", goodOptions)
            spotlight("bad options", badOptions);
            spotlight("good ensure", goodEnsure)
            spotlight("bad ensure", badEnsure);
        })
        const goodDefault = { name: faker.name.firstName() }
        const badDefault = { name: faker.name.firstName() }
        const goodOptions = { name: "321654987" }
        const badOptions = null;
        const goodEnsure = ensureObject(goodOptions, goodDefault);
        const badEnsure = ensureObject(badOptions, badDefault)
        expect(goodEnsure.name).equals(goodOptions.name);
        expect(badEnsure.name).equals(badDefault.name);
    }

    public ensureArrayTest({ expect, spotlight, beforeThrowing }: Apparatus) {
        beforeThrowing(() => {
            spotlight("default options", goodDefault);
            spotlight("bad default", badDefault)
            spotlight("good options", goodOptions)
            spotlight("bad options", badOptions);
            spotlight("good ensure", goodEnsure);
            spotlight("bad ensure", badEnsure)
        })
        const goodDefault = ["one", "two"]
        const badDefault = ["one", "two"]
        const goodOptions = ["three"]
        const badOptions = null
        const goodEnsure = ensureArray(goodOptions, goodDefault)
        const badEnsure = ensureArray(badOptions, badDefault);
        expect(goodEnsure[0]).equals("three")
        expect(goodEnsure[1]).equals("two")
        expect(badEnsure[0]).equals("one")
        expect(badEnsure[1]).equals("two")
    }

    public whenFunctionTest({ expect }: Apparatus) {
        let counter = 0
        whenFunction(() => counter++)();
        whenFunction(null)();
        expect(counter).equals(1);
    }

    public whenTrueTest({ expect }: Apparatus) {
        let counter = 0
        whenTrue(true)(() => counter++)
        whenTrue(false)(() => counter++)
        expect(counter).equals(1)
    }

    public whenNotStringTest({ expect }: Apparatus) {
        expect(() => whenNotString(null, "bad message")).to.throw("bad message")
        expect(whenNotString("something", "??")).equal("something")
    }

    public whenStringVoidOfCharactersTest({ expect }: Apparatus) {
        expect(() => whenStringVoidOfCharacters("", "bad message")).to.throw("bad message")
        expect(whenStringVoidOfCharacters("something", "??")).equal("something")
    }

    public stringOrNothingTest({ expect }: Apparatus) {
        expect(stringOrNothing(null)).equal(undefined)
        expect(stringOrNothing("something")).equal("something")
    }

    public functionOrNothingTest({ expect }: Apparatus) {
        const handler = () => { }
        expect(functionOrNothing(null)).equal(undefined)
        expect(functionOrNothing(handler)).equal(handler)
    }

    public numberOrDefaultTest({ expect }: Apparatus) {
        expect(numberOrDefault(null, 3)).equal(3)
        expect(numberOrDefault(2, 3)).equal(2)
    }

}
