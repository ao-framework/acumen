import { Apparatus } from "../../src";
import { SuiteProcessors } from "./suite.processors";
export declare class EntryCommonsDirectory {
    descriptions: {
        suite: string;
    };
    suites: (typeof SuiteProcessors)[];
    controller({ suite, expect }: Apparatus): Promise<void>;
}
