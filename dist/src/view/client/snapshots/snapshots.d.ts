import { iSnapshotSuite } from "../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../contracts/snapshots/model/iSnapshotTestInstance";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";
export declare class Snapshots {
    private client;
    currentEntry: EntryFile;
    currentTest: iSnapshotTest;
    currentInstance: iSnapshotTestInstance;
    constructor(client: Client);
    parseResponse(response: ResponseTranslator): void;
    getSnapshotForEntry(entryFile: EntryFile): void;
    selectEntry(entryBase64: string): void;
    selectInstance(instance: iSnapshotTestInstance, test: iSnapshotTest): void;
    updateSuite(suite: iSnapshotSuite): void;
}
