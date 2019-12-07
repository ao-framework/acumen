import { ResponseTranslator } from "../../../translation/responseTranslator";
import { Client } from "../client";
import { Notification } from "./notification";

export class Notifications {

    public counter: number = 0;

    public list: Notification[] = [];

    public createNotification() {
        return new Notification(this);
    }

    public constructor(private client: Client) {
        client.on("dispatch.response",
            (response) => this.parseResponse(response))
    }

    public parseResponse(response: ResponseTranslator) {
        response.whenError(error => {
            this.removeLingeringErrors();
            // it takes 500 milliseconds for the errors to disappear
            // if their were any. Let's wait until they are all gone first
            setTimeout(() => {
                this.client.stopAllLoading();
                const notification = this.createNotification()
                notification.type = "error"
                notification.error = error.body
                this.addNotification(notification)
            }, 500)
        })
        response.whenMessage(message => {
            if (message.body.type === "notification") {
                const notification = this.createNotification();
                notification.type = "info";
                notification.content = message.body.data;
                this.addNotification(notification);
            }
            if (message.body.type === "update") {
                const notification = this.createNotification();
                notification.type = "info"
                notification.content = "Detected file change"
                this.addNotification(notification, 2000);
            }
        })
    }

    public addNotification(notification: Notification, timeout?: number) {
        notification.id = this.counter;
        this.counter++;
        this.list.unshift(notification);
        if (timeout) {
            setTimeout(() => notification.remove(), timeout)
        }
    }

    public removeLingeringErrors() {
        this.list.forEach(notification => {
            if (notification.type === "error") {
                notification.remove();
            }
        })
    }

}
