import { Apparatus } from "../../src";
export declare class SuiteQueue {
    descriptions: {
        suite: string;
        queuePushTest: string;
    };
    controller({ test }: Apparatus): Promise<void>;
    queuePushTest({ expect, spotlight }: Apparatus): Promise<unknown>;
}
