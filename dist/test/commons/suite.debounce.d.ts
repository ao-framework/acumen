import { Apparatus } from "../../src";
export declare class SuiteDebounce {
    descriptions: {
        suite: string;
        doDebounceTest: string;
    };
    controller({ test }: Apparatus): Promise<void>;
    doDebounceTest({ expect, spotlight, warning }: Apparatus): Promise<unknown>;
}
