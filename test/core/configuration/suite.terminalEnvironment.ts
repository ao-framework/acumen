import { Apparatus } from "../../../src";

export class SuiteTerminalEnvironment {

    public suites = []

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
    }
}
