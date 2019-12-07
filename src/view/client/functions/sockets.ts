import { Client } from "client/client";

import { translateResponse } from "../../../translation/translate";

export function setupSocket(client: Client) {
    return new Promise((done) => {
        client.socket.onopen = () => {
            client.online = true;
            done()
        }
        client.socket.onclose = () => client.online = false;
    })
}

export function setupSocketMessaging(client: Client) {
    client.socket.onmessage = (message) => {
        try {
            const response = translateResponse(JSON.parse(message.data))
            client.emit("dispatch.response", response);
        } catch (err) {
            console.error(err);
        }
    }
}
