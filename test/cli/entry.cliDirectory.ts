import { Apparatus } from "../../src";
import { SuiteCli } from "./suite.cli";
import { SuiteLoader } from "./suite.loader";

export class EntryCliDirectory {

    public suites = [
        SuiteCli,
        SuiteLoader
    ]

    public async controller({ suite, faker }: Apparatus) {
        return Promise.resolve()
            .then(() => suite(SuiteCli))
            .then(() => suite(SuiteLoader))
    }
}
