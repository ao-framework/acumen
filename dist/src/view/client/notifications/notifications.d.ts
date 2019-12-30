import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { Notification } from "./notification";
export declare class Notifications {
    private client;
    counter: number;
    list: Notification[];
    createNotification(): Notification;
    constructor(client: Client);
    parseResponse(response: ResponseTranslator): void;
    addNotification(notification: Notification, timeout?: number): void;
    removeLingeringErrors(): void;
}
