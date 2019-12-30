import { Apparatus } from "../../src";
export declare class SuiteValidators {
    descriptions: {
        suite: string;
        isNullTest: string;
        isUndefinedTest: string;
        isNillTest: string;
        isObjectLikeTest: string;
        isArrayTest: string;
        isObjectTest: string;
    };
    controller({ suite, test }: Apparatus): Promise<void>;
    isNullTest({ expect }: Apparatus): void;
    isUndefinedTest({ expect }: Apparatus): void;
    isNillTest({ expect }: Apparatus): void;
    isObjectLikeTest({ expect }: Apparatus): void;
    isArrayTest({ expect }: Apparatus): void;
    isObjectTest({ expect }: Apparatus): void;
}
