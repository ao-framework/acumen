import { Apparatus } from "../../../src";
export declare class SuiteServerEnvironment {
    suites: any[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
