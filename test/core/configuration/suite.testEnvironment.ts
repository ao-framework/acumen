import { Apparatus } from "../../../src";

export class SuiteTestEnvironment {

    public suites = []

    public async controller({ suite, test, parallel }: Apparatus) {
        return Promise.resolve();
    }
}
