"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Notification {
    constructor(notifications) {
        this.notifications = notifications;
        this.markedForRemoval = false;
    }
    remove() {
        this.notifications.list.forEach((notification, index) => {
            if (notification === this) {
                notification.markedForRemoval = true;
                setTimeout(() => {
                    const id = notification.id;
                    this.notifications.list.forEach((notification, index) => {
                        if (notification.id === id) {
                            this.notifications.list.splice(index, 1);
                        }
                    });
                }, 500);
            }
        });
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map