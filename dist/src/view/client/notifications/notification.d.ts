import { Notifications } from "./notifications";
export declare class Notification {
    notifications: Notifications;
    id: number;
    type: "info" | "warning" | "error";
    title: string;
    content: string;
    error: string[];
    markedForRemoval: boolean;
    constructor(notifications: Notifications);
    remove(): void;
}
