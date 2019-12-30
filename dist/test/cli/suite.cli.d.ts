import { Apparatus } from "../../src";
export declare class SuiteCli {
    suites: any[];
    descriptions: {
        suite: string;
        controller: string;
        cliInstance: string;
    };
    controller({ suite, test }: Apparatus): Promise<void>;
    cliInstance({ spotlight, expect }: Apparatus): void;
    hasConfigFile(): void;
    getConcepts(): void;
    getConcept(): void;
    callConcept(): void;
}
