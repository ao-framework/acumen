import { Apparatus } from "../../src";
export declare class SuiteHelpers {
    descriptions: {
        suite: string;
        getMethodNamesTest: string;
    };
    controller({ suite, test }: Apparatus): Promise<void>;
    getMethodNamesTest({ expect, warning, beforeThrowing }: Apparatus): void;
}
