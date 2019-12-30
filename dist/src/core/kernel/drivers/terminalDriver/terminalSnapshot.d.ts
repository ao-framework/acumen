import { iSnapshotSuite } from "../../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../../contracts/snapshots/model/iSnapshotTestInstance";
import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { Kernel } from "../../kernel";
export declare class TerminalSnapshot {
    private kernel;
    private terminalEnvironment;
    entries: string[];
    constructor(kernel: Kernel, terminalEnvironment: TerminalEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSnapshot;
    update(): void;
    suite(suite: iSnapshotSuite, lines: string[], space?: string): void;
    doController(test: iSnapshotTest, lines: string[], space?: string): void;
    test(test: iSnapshotTest, lines: string[], space?: string): void;
    testInstance(instance: iSnapshotTestInstance, lines: string[], space?: string): void;
}
