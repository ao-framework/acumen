import WebSocket from "ws";
import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { Kernel } from "../../kernel";
export declare class AcumenServerMessenger {
    private kernel;
    private serverEnvironment;
    connections: any[];
    constructor(kernel: Kernel, serverEnvironment: ServerEnvironment);
    alertSocketConnection(socket: WebSocket): void;
    alertSocketDisconnection(socket: WebSocket): void;
    alertChange(socket: WebSocket): void;
    sendError(socket: WebSocket, message: string): void;
    sendNotification(socket: WebSocket, notification: string): void;
    sendData(socket: WebSocket, data: any): void;
    displayServerBooted(address: string, port: number): void;
}
