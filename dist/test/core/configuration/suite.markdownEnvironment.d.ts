import { Apparatus } from "../../../src";
export declare class SuiteMarkdownEnvironment {
    suites: any[];
    controller({ suite, test }: Apparatus): Promise<void>;
    defaultSettings({ expect, spotlight, beforeThrowing }: Apparatus): void;
}
