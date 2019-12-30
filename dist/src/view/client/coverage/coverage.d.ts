import { iCoverageFile } from "../../../contracts/coverage/model/iCoverageFile";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";
export declare class Coverage {
    private client;
    currentEntry: EntryFile;
    currentFile: iCoverageFile;
    constructor(client: Client);
    parseResponse(response: ResponseTranslator): void;
    selectEntry(entryBase64: string): void;
    selectFile(file: iCoverageFile): void;
    getCoverageForEntry(entryFile: EntryFile): void;
}
