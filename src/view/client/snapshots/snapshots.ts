import { iSnapshotSuite } from "../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../contracts/snapshots/model/iSnapshotTestInstance";
import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { EntryFile } from "../entry/entryFile";

export class Snapshots {

    public currentEntry: EntryFile = null;

    public currentTest: iSnapshotTest = null;

    public currentInstance: iSnapshotTestInstance = null;

    public constructor(private client: Client) {
        client.on("dispatch.response",
            (response) => this.parseResponse(response));
    }

    public parseResponse(response: ResponseTranslator) {
        response.whenSnapshot(snapshot => {
            console.log(snapshot)
            const entry = this.client.entries[snapshot.headers.entry.base64];
            entry.snapshotLoading = false;
            entry.snapshot = Object.freeze(snapshot.body.data);
            if (this.currentInstance) { this.updateSuite(entry.snapshot.suite) }
        })
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getSnapshotForEntry(this.currentEntry)
                }
            }
        })
    }


    public getSnapshotForEntry(entryFile: EntryFile) {
        this.client.notifications.removeLingeringErrors();
        entryFile.snapshotLoading = true;
        this.client.send({
            url: "/snapshot",
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

    public selectEntry(entryBase64: string) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }

    public selectInstance(instance: iSnapshotTestInstance, test: iSnapshotTest) {
        this.currentTest = test;
        this.currentInstance = instance;
    }

    public updateSuite(suite: iSnapshotSuite) {
        suite.controller.instances.forEach(instance => {
            if (instance.id === this.currentInstance.id) {
                this.currentTest = suite.controller;
                this.currentInstance = instance;
            }
        })
        for (var iterator in suite.tests) {
            let test = suite.tests[iterator]
            test.instances.forEach(instance => {
                if (instance.id === this.currentInstance.id) {
                    this.currentTest = test;
                    this.currentInstance = instance;
                }
            })
        }
        for (var iterator in suite.suites) {
            let s = suite.suites[iterator]
            this.updateSuite(s);
        }
    }

}



