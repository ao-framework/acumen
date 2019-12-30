import { Apparatus } from "../../src";
export declare class SuiteCoolKids {
    descriptions: {
        suite: string;
        ensureObjectTest: string;
        ensureArrayTest: string;
        whenFunctionTest: string;
        whenTrueTest: string;
        whenNotStringTest: string;
        whenStringVoidOfCharactersTest: string;
        stringOrNothingTest: string;
        functionOrNothingTest: string;
        numberOrDefaultTest: string;
    };
    controller({ test }: Apparatus): Promise<void>;
    ensureObjectTest({ expect, spotlight, faker, beforeThrowing }: Apparatus): void;
    ensureArrayTest({ expect, spotlight, beforeThrowing }: Apparatus): void;
    whenFunctionTest({ expect }: Apparatus): void;
    whenTrueTest({ expect }: Apparatus): void;
    whenNotStringTest({ expect }: Apparatus): void;
    whenStringVoidOfCharactersTest({ expect }: Apparatus): void;
    stringOrNothingTest({ expect }: Apparatus): void;
    functionOrNothingTest({ expect }: Apparatus): void;
    numberOrDefaultTest({ expect }: Apparatus): void;
}
