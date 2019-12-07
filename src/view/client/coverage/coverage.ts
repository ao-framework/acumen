import { iCoverageFile } from "../../../contracts/coverage/model/iCoverageFile";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";

export class Coverage {

    public currentEntry: EntryFile = null;

    public currentFile: iCoverageFile = null;

    public constructor(private client: Client) {
        client.on("dispatch.response",
            (response) => this.parseResponse(response));
    }


    public parseResponse(response: ResponseTranslator) {
        response.whenCoverage(coverage => {
            if (this.currentEntry && this.currentEntry === this.client.entries[coverage.headers.entry.base64]) {
                this.currentEntry.coverage = Object.freeze(coverage.body.data);
                this.currentEntry.coverageLoading = false;
            }
        })
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getCoverageForEntry(this.currentEntry)
                }
            }
        })
    }

    public selectEntry(entryBase64: string) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }

    public selectFile(file: iCoverageFile) {
        this.currentFile = file;
    }

    public getCoverageForEntry(entryFile: EntryFile) {
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
        })
    }

}
