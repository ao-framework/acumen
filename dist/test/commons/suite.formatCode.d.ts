import { Apparatus } from "../../src";
export declare class SuiteFormatCode {
    descriptions: {
        suite: string;
        formatCodeTest: string;
    };
    controller({ suite, test }: Apparatus): Promise<void>;
    /**
      * No need to test extensively. The prettier library should be
      * taking care of this for us.
      */
    formatCodeTest({ expect, warning }: Apparatus): void;
}
