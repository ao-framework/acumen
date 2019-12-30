"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Snapshots {
    constructor(client) {
        this.client = client;
        this.currentEntry = null;
        this.currentTest = null;
        this.currentInstance = null;
        client.on("dispatch.response", (response) => this.parseResponse(response));
    }
    parseResponse(response) {
        response.whenSnapshot(snapshot => {
            console.log(snapshot);
            const entry = this.client.entries[snapshot.headers.entry.base64];
            entry.snapshotLoading = false;
            entry.snapshot = Object.freeze(snapshot.body.data);
            if (this.currentInstance) {
                this.updateSuite(entry.snapshot.suite);
            }
        });
        response.whenMessage(message => {
            if (message.body.type === "update") {
                if (this.currentEntry) {
                    this.getSnapshotForEntry(this.currentEntry);
                }
            }
        });
    }
    getSnapshotForEntry(entryFile) {
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
        });
    }
    selectEntry(entryBase64) {
        if (this.client.entries[entryBase64]) {
            this.currentEntry = this.client.entries[entryBase64];
        }
    }
    selectInstance(instance, test) {
        this.currentTest = test;
        this.currentInstance = instance;
    }
    updateSuite(suite) {
        suite.controller.instances.forEach(instance => {
            if (instance.id === this.currentInstance.id) {
                this.currentTest = suite.controller;
                this.currentInstance = instance;
            }
        });
        for (var iterator in suite.tests) {
            let test = suite.tests[iterator];
            test.instances.forEach(instance => {
                if (instance.id === this.currentInstance.id) {
                    this.currentTest = test;
                    this.currentInstance = instance;
                }
            });
        }
        for (var iterator in suite.suites) {
            let s = suite.suites[iterator];
            this.updateSuite(s);
        }
    }
}
exports.Snapshots = Snapshots;
//# sourceMappingURL=snapshots.js.map