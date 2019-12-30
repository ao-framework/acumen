"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
class Notifications {
    constructor(client) {
        this.client = client;
        this.counter = 0;
        this.list = [];
        client.on("dispatch.response", (response) => this.parseResponse(response));
    }
    createNotification() {
        return new notification_1.Notification(this);
    }
    parseResponse(response) {
        response.whenError(error => {
            this.removeLingeringErrors();
            // it takes 500 milliseconds for the errors to disappear
            // if their were any. Let's wait until they are all gone first
            setTimeout(() => {
                this.client.stopAllLoading();
                const notification = this.createNotification();
                notification.type = "error";
                notification.error = error.body;
                this.addNotification(notification);
            }, 500);
        });
        response.whenMessage(message => {
            if (message.body.type === "notification") {
                const notification = this.createNotification();
                notification.type = "info";
                notification.content = message.body.data;
                this.addNotification(notification);
            }
            if (message.body.type === "update") {
                const notification = this.createNotification();
                notification.type = "info";
                notification.content = "Detected file change";
                this.addNotification(notification, 2000);
            }
        });
    }
    addNotification(notification, timeout) {
        notification.id = this.counter;
        this.counter++;
        this.list.unshift(notification);
        if (timeout) {
            setTimeout(() => notification.remove(), timeout);
        }
    }
    removeLingeringErrors() {
        this.list.forEach(notification => {
            if (notification.type === "error") {
                notification.remove();
            }
        });
    }
}
exports.Notifications = Notifications;
//# sourceMappingURL=notifications.js.map