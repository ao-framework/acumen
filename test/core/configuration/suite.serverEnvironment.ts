import { Apparatus } from "../../../src";

export class SuiteServerEnvironment {

    public suites = []

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
    }
}
