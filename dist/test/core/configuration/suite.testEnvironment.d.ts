import { Apparatus } from "../../../src";
export declare class SuiteTestEnvironment {
    suites: any[];
    controller({ suite, test, parallel }: Apparatus): Promise<void>;
}
