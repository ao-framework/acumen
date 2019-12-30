import { Apparatus } from "../../../src";
import { SuiteJsonEnvironment } from "./suite.jsonEnvironment";
import { SuiteServerEnvironment } from "./suite.serverEnvironment";
export declare class EntryConfigurationDirectory {
    suites: (typeof SuiteJsonEnvironment | typeof SuiteServerEnvironment)[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
