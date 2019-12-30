import { Apparatus } from "../../../src";
export declare class SuiteJsonEnvironment {
    controller({ suite, test }: Apparatus): Promise<void>;
    defaultSettings({ expect, spotlight, beforeThrowing }: Apparatus): void;
}
