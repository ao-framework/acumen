import WebSocket from "ws";

import { iDispatchResponseError } from "../../../../contracts/error/iDispatchResponseError";
import { iDispatchResponseMessage } from "../../../../contracts/messages/iDispatchResponseMessage";
import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { Kernel } from "../../kernel";

export class AcumenServerMessenger {

    public connections = [];

    public constructor(private kernel: Kernel, private serverEnvironment: ServerEnvironment) { }

    public alertSocketConnection(socket: WebSocket) {
        const length = this.connections.push(socket);
        const lines = [`<cyan>[Socket Connect]</cyan> to Acumen Testing Server: <magenta>${length}</magenta>`];
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }

    public alertSocketDisconnection(socket: WebSocket) {
        const index = this.connections.indexOf(socket)
        this.connections.splice(index, 1)
        const lines = [`<red>[Socket Disconnect]</red> to Acumen Testing Server: <magenta>${index + 1}</magenta>`];
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }

    public alertChange(socket: WebSocket) {
        const message = {} as iDispatchResponseMessage;
        message.url = "/message";
        message.body = {
            type: "update",
            data: null
        };
        message.headers = {};
        socket.send(JSON.stringify(message));
    }

    public sendError(socket: WebSocket, message: string) {
        const response = {} as iDispatchResponseError;
        response.url = "/error"
        response.body = new Error(message).stack.split("\n");
        response.headers = { reason: "conditional" }
        socket.send(JSON.stringify(response));
    }

    public sendNotification(socket: WebSocket, notification: string) {
        const message = {} as iDispatchResponseMessage;
        message.url = "/message";
        message.body = {
            type: "notification",
            data: notification
        };
        message.headers = {};
        socket.send(JSON.stringify(message));
    }

    public sendData(socket: WebSocket, data: any) {
        socket.send(JSON.stringify(data));
    }

    public displayServerBooted(address: string, port: number) {
        const lines = [`[Acumen UI] running <cyan>http://${address}:${port}</cyan>`]
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }

}
