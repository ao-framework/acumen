import { Apparatus } from "../../../src";
export declare class SuiteTerminalEnvironment {
    suites: any[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
