"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const coverage_1 = require("./coverage/coverage");
const manifest_1 = require("./functions/manifest");
const sockets_1 = require("./functions/sockets");
const timers_1 = require("./functions/timers");
const notifications_1 = require("./notifications/notifications");
const schemas_1 = require("./schema/schemas");
const snapshots_1 = require("./snapshots/snapshots");
class Client extends events_1.EventEmitter {
    constructor() {
        super();
        this.loading = true;
        this.currentWorkingDirectory = null;
        this.entries = {};
        this.schemas = null;
        this.snapshots = null;
        this.coverage = null;
        this.notifications = new notifications_1.Notifications(this);
        this.online = true;
        this.socket = new WebSocket("ws://" + location.host);
        Promise.resolve()
            .then(() => sockets_1.setupSocket(this))
            .then(() => sockets_1.setupSocketMessaging(this))
            .then(() => manifest_1.getManifest())
            .then((manifest) => manifest_1.setupManifest(this, manifest))
            .then(() => this.schemas = new schemas_1.Schemas(this))
            .then(() => this.snapshots = new snapshots_1.Snapshots(this))
            .then(() => this.coverage = new coverage_1.Coverage(this))
            .then(() => timers_1.delay(2000))
            .then(() => this.loading = false)
            .then(() => this.emit("load"))
            .then(() => console.log(this));
    }
    send(request) {
        this.socket.send(JSON.stringify(request));
    }
    stopAllLoading() {
        for (let iterator in this.entries) {
            this.entries[iterator].snapshotLoading = false;
            this.entries[iterator].schemaLoading = false;
            this.entries[iterator].coverageLoading = false;
        }
    }
    reset() {
        this.snapshots.currentEntry = null;
        this.snapshots.currentTest = null;
        this.snapshots.currentInstance = null;
    }
}
exports.Client = Client;
exports.default = new Client();
//# sourceMappingURL=client.js.map