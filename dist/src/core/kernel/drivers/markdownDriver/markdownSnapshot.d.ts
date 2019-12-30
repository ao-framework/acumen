import { iKeyValuePair } from "../../../../contracts/base/iKeyValuePair";
import { iSnapshotSuite } from "../../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../../contracts/snapshots/model/iSnapshotTestInstance";
import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { Kernel } from "../../kernel";
declare type iResourceCounter = iKeyValuePair<number>;
export declare class MarkdownSnapshot {
    private kernel;
    private markdownEnvironment;
    entries: string[];
    constructor(kernel: Kernel, markdownEnvironment: MarkdownEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSnapshot;
    update(): void;
    loadSuite(lines: string[], suite: iSnapshotSuite, entry: string): void;
    getResourceLink(resourceCounter: iResourceCounter, name: string): string;
    loadSuiteForTree(lines: string[], suite: iSnapshotSuite, resourceCounter: iResourceCounter, space?: string): void;
    loadTestForTree(lines: string[], test: iSnapshotTest, resourceCounter: iResourceCounter, space?: string): void;
    loadSuiteForDocumentation(lines: string[], suite: iSnapshotSuite, space?: string): void;
    loadTestForDocumentation(lines: string[], test: iSnapshotTest): void;
    loadTestInstanceForDocumentation(lines: string[], instance: iSnapshotTestInstance, count: number): void;
}
export {};
