/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { AcumenServer } from "./acumenServer";
export declare class AcumenServerServices {
    private server;
    constructor(server: AcumenServer);
    serverHandler(): (request: IncomingMessage, response: ServerResponse) => void;
    getJson<Context>(request: IncomingMessage): Promise<Context>;
    sendJson(response: ServerResponse, status: number, data: any): void;
    getManifest(request: IncomingMessage, response: ServerResponse): void;
    codeCounter(request: IncomingMessage, response: ServerResponse): void;
}
