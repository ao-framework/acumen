import { iSchemaTest } from "../../../contracts/schema/model/iSchemaTest";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";
export declare class Schemas {
    private client;
    currentEntry: EntryFile;
    currentTest: iSchemaTest;
    constructor(client: Client);
    parseResponse(response: ResponseTranslator): void;
    selectEntry(entryBase64: string): void;
    getSchemaForEntry(entryFile: EntryFile): void;
}
