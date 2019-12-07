import { Apparatus } from "../../../src";
import { SuiteJsonEnvironment } from "./suite.jsonEnvironment";
import { SuiteMarkdownEnvironment } from "./suite.markdownEnvironment";
import { SuiteServerEnvironment } from "./suite.serverEnvironment";
import { SuiteTerminalEnvironment } from "./suite.terminalEnvironment";
import { SuiteTestEnvironment } from "./suite.testEnvironment";

export class EntryConfigurationDirectory {

    public suites = [
        SuiteJsonEnvironment,
        SuiteMarkdownEnvironment,
        SuiteServerEnvironment,
        SuiteTerminalEnvironment,
        SuiteTestEnvironment
    ]

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => suite(SuiteJsonEnvironment))
            .then(() => suite(SuiteMarkdownEnvironment))
            .then(() => suite(SuiteServerEnvironment))
            .then(() => suite(SuiteTerminalEnvironment))
            .then(() => suite(SuiteTestEnvironment))
    }

}
