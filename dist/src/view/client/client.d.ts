/// <reference types="node" />
import { EventEmitter } from "events";
import { iCoverageOptions } from "../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { ResponseTranslator } from "../../translation/responseTranslator";
import { Coverage } from "./coverage/coverage";
import { EntryFile } from "./entry/entryFile";
import { Notifications } from "./notifications/notifications";
import { Schemas } from "./schema/schemas";
import { Snapshots } from "./snapshots/snapshots";
export interface Client {
    on(channel: "load", listener: () => any): this;
    on(channel: "dispatch.response", listener: (response: ResponseTranslator) => any): this;
}
export declare class Client extends EventEmitter {
    loading: boolean;
    currentWorkingDirectory: string;
    coverageOptions: iCoverageOptions;
    entries: {
        [key: string]: EntryFile;
    };
    schemas: Schemas;
    snapshots: Snapshots;
    coverage: Coverage;
    notifications: Notifications;
    online: boolean;
    socket: WebSocket;
    constructor();
    send(request: iDispatchRequest<any, any>): void;
    stopAllLoading(): void;
    reset(): void;
}
declare const _default: Client;
export default _default;
