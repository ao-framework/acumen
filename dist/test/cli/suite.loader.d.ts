import { Apparatus } from "../../src";
export declare class SuiteLoader {
    suites: any[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
