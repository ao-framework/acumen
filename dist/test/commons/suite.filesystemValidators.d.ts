import { Apparatus } from "../../src";
export declare class SuiteFilesystemValidators {
    descriptions: {
        suite: string;
        relativeToAcumenTest: string;
        relativeToProjectTest: string;
        isFileTest: string;
        isFileOrFailTest: string;
        isDirectoryTest: string;
        isDirectoryOrFailTest: string;
        fileContentsTest: string;
        fileContentsFailTest: string;
        makeRelativePathsTest: string;
    };
    controller({ test, testAll }: Apparatus): Promise<void>;
    relativeToAcumenTest({ expect, generator }: Apparatus): void;
    relativeToProjectTest({ expect }: Apparatus): void;
    isFileTest({ expect, beforeThrowing, spotlight }: Apparatus): void;
    isFileOrFailTest({ expect, beforeThrowing, spotlight }: Apparatus): void;
    isDirectoryTest({ expect, beforeThrowing, spotlight }: Apparatus): void;
    isDirectoryOrFailTest({ expect, beforeThrowing, spotlight }: Apparatus): void;
    fileContentsTest({ expect, spotlight, beforeThrowing }: Apparatus): Promise<void>;
    fileContentsFailTest({ expect, spotlight, beforeThrowing, warning }: Apparatus): Promise<void>;
    makeRelativePathsTest({ expect, spotlight, beforeThrowing }: Apparatus): void;
}
