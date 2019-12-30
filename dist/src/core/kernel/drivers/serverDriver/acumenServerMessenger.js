"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AcumenServerMessenger {
    constructor(kernel, serverEnvironment) {
        this.kernel = kernel;
        this.serverEnvironment = serverEnvironment;
        this.connections = [];
    }
    alertSocketConnection(socket) {
        const length = this.connections.push(socket);
        const lines = [`<cyan>[Socket Connect]</cyan> to Acumen Testing Server: <magenta>${length}</magenta>`];
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }
    alertSocketDisconnection(socket) {
        const index = this.connections.indexOf(socket);
        this.connections.splice(index, 1);
        const lines = [`<red>[Socket Disconnect]</red> to Acumen Testing Server: <magenta>${index + 1}</magenta>`];
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }
    alertChange(socket) {
        const message = {};
        message.url = "/message";
        message.body = {
            type: "update",
            data: null
        };
        message.headers = {};
        socket.send(JSON.stringify(message));
    }
    sendError(socket, message) {
        const response = {};
        response.url = "/error";
        response.body = new Error(message).stack.split("\n");
        response.headers = { reason: "conditional" };
        socket.send(JSON.stringify(response));
    }
    sendNotification(socket, notification) {
        const message = {};
        message.url = "/message";
        message.body = {
            type: "notification",
            data: notification
        };
        message.headers = {};
        socket.send(JSON.stringify(message));
    }
    sendData(socket, data) {
        socket.send(JSON.stringify(data));
    }
    displayServerBooted(address, port) {
        const lines = [`[Acumen UI] running <cyan>http://${address}:${port}</cyan>`];
        this.kernel.modules.messages.info(this.serverEnvironment, lines);
    }
}
exports.AcumenServerMessenger = AcumenServerMessenger;
//# sourceMappingURL=acumenServerMessenger.js.map