"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schemas {
    constructor(client) {
        this.client = client;
        this.currentEntry = null;
        this.currentTest = null;
        client.on("dispatch.response", (response) => this.parseResponse(response));
    }
    parseResponse(response) {
        response.whenSchema(schema => {
            const entry = this.client.entries[schema.headers.entry.base64];
            entry.schemaLoading = false;
            entry.schema = schema.body.data;
        });
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getSchemaForEntry(this.currentEntry);
                }
            }
        });
    }
    selectEntry(entryBase64) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }
    getSchemaForEntry(entryFile) {
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
        });
    }
}
exports.Schemas = Schemas;
//# sourceMappingURL=schemas.js.map