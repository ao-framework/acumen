import { Apparatus } from "../../src";

export class SuiteLoader {

    public suites = []

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
    }
}
