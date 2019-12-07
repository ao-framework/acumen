import { EventEmitter } from "events";

import { iCoverageOptions } from "../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { ResponseTranslator } from "../../translation/responseTranslator";
import { Coverage } from "./coverage/coverage";
import { EntryFile } from "./entry/entryFile";
import { getManifest, setupManifest } from "./functions/manifest";
import { setupSocket, setupSocketMessaging } from "./functions/sockets";
import { delay } from "./functions/timers";
import { Notifications } from "./notifications/notifications";
import { Schemas } from "./schema/schemas";
import { Snapshots } from "./snapshots/snapshots";

export interface Client {
    on(channel: "load", listener: () => any): this;
    on(channel: "dispatch.response", listener: (response: ResponseTranslator) => any): this
}

export class Client extends EventEmitter {
    public loading: boolean = true;
    public currentWorkingDirectory: string = null;
    public coverageOptions: iCoverageOptions;
    public entries: { [key: string]: EntryFile } = {}
    public schemas: Schemas = null;
    public snapshots: Snapshots = null;
    public coverage: Coverage = null;
    public notifications = new Notifications(this);
    public online: boolean = true;
    public socket: WebSocket = new WebSocket("ws://" + location.host)

    public constructor() {
        super();
        Promise.resolve()
            .then(() => setupSocket(this))
            .then(() => setupSocketMessaging(this))
            .then(() => getManifest())
            .then((manifest) => setupManifest(this, manifest))
            .then(() => this.schemas = new Schemas(this))
            .then(() => this.snapshots = new Snapshots(this))
            .then(() => this.coverage = new Coverage(this))
            .then(() => delay(2000))
            .then(() => this.loading = false)
            .then(() => this.emit("load"))
            .then(() => console.log(this))
    }

    public send(request: iDispatchRequest<any, any>) {
        this.socket.send(JSON.stringify(request));
    }

    public stopAllLoading() {
        for (let iterator in this.entries) {
            this.entries[iterator].snapshotLoading = false;
            this.entries[iterator].schemaLoading = false;
            this.entries[iterator].coverageLoading = false;
        }
    }

    public reset() {
        this.snapshots.currentEntry = null;
        this.snapshots.currentTest = null;
        this.snapshots.currentInstance = null;
    }
}

export default new Client();
