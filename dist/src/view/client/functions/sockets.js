"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translate_1 = require("../../../translation/translate");
function setupSocket(client) {
    return new Promise((done) => {
        client.socket.onopen = () => {
            client.online = true;
            done();
        };
        client.socket.onclose = () => client.online = false;
    });
}
exports.setupSocket = setupSocket;
function setupSocketMessaging(client) {
    client.socket.onmessage = (message) => {
        try {
            const response = translate_1.translateResponse(JSON.parse(message.data));
            client.emit("dispatch.response", response);
        }
        catch (err) {
            console.error(err);
        }
    };
}
exports.setupSocketMessaging = setupSocketMessaging;
//# sourceMappingURL=sockets.js.map