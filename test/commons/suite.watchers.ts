import { Apparatus } from "../../src";

export class SuiteWatchers {

    public suites = []

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
    }
}
