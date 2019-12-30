"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coverage {
    constructor(client) {
        this.client = client;
        this.currentEntry = null;
        this.currentFile = null;
        client.on("dispatch.response", (response) => this.parseResponse(response));
    }
    parseResponse(response) {
        response.whenCoverage(coverage => {
            if (this.currentEntry && this.currentEntry === this.client.entries[coverage.headers.entry.base64]) {
                this.currentEntry.coverage = Object.freeze(coverage.body.data);
                this.currentEntry.coverageLoading = false;
            }
        });
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getCoverageForEntry(this.currentEntry);
                }
            }
        });
    }
    selectEntry(entryBase64) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }
    selectFile(file) {
        this.currentFile = file;
    }
    getCoverageForEntry(entryFile) {
        entryFile.coverageLoading = true;
        this.client.send({
            url: "/coverage",
            userAgent: "@server.client",
            headers: {
                entry: {
                    path: entryFile.path,
                    base64: entryFile.base64,
                    length: entryFile.path.length
                }
            },
            body: this.client.coverageOptions
        });
    }
}
exports.Coverage = Coverage;
//# sourceMappingURL=coverage.js.map