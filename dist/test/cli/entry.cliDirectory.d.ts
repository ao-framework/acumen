import { Apparatus } from "../../src";
import { SuiteLoader } from "./suite.loader";
export declare class EntryCliDirectory {
    suites: (typeof SuiteLoader)[];
    controller({ suite, faker }: Apparatus): Promise<void>;
}
