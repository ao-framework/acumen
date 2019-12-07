import { iSchemaTest } from "../../../contracts/schema/model/iSchemaTest";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";

export class Schemas {

    public currentEntry: EntryFile = null;

    public currentTest: iSchemaTest = null;

    public constructor(private client: Client) {
        client.on("dispatch.response",
            (response) => this.parseResponse(response));
    }

    public parseResponse(response: ResponseTranslator) {
        response.whenSchema(schema => {
            const entry = this.client.entries[schema.headers.entry.base64];
            entry.schemaLoading = false;
            entry.schema = schema.body.data;
        })
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getSchemaForEntry(this.currentEntry);
                }
            }
        })
    }

    public selectEntry(entryBase64: string) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }

    public getSchemaForEntry(entryFile: EntryFile) {
        this.client.notifications.removeLingeringErrors();
        entryFile.schemaLoading = true;
        this.client.send({
            url: "/schema",
            userAgent: "@server.client",
            headers: {
                entry: {
                    path: entryFile.path,
                    base64: entryFile.base64,
                    length: entryFile.path.length
                }
            },
            body: null
        })
    }

}
