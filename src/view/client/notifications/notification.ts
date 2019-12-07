import { Notifications } from "./notifications";

export class Notification {

    public id: number;

    public type: "info" | "warning" | "error"

    public title: string;

    public content: string;

    public error: string[];

    public markedForRemoval: boolean = false;

    public constructor(public notifications: Notifications) { }

    public remove() {
        this.notifications.list.forEach((notification, index) => {
            if (notification === this) {
                notification.markedForRemoval = true;
                setTimeout(() => {
                    const id = notification.id;
                    this.notifications.list.forEach((notification, index) => {
                        if (notification.id === id) {
                            this.notifications.list.splice(index, 1);
                        }
                    })
                }, 500)
            }
        })
    }

}
