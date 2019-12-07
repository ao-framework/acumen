import { Apparatus } from "../../src";
import { getMethodNames } from "../../src/commons/helpers";

export class SuiteHelpers {

    public descriptions = {
        suite: "handles all functions in the helpers file",
        getMethodNamesTest: "it should be able to return all methods from an instance of a class"
    }

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.getMethodNamesTest))
    }

    public getMethodNamesTest({ expect, warning, beforeThrowing }: Apparatus) {
        const list = getMethodNames(this)
        beforeThrowing(() => warning("something happened", list))
        expect(list.includes("controller")).equals(true);
        expect(list.includes("getMethodNamesTest")).equals(true);
    }
}
