import { Apparatus } from "../../src";
export declare class SuiteWatchers {
    suites: any[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
