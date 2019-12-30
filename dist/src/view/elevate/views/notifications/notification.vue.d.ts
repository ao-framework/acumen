import { Vue } from 'vue-property-decorator';
import { Notification as NotificationModel } from "client/notifications/notification";
export default class Notification extends Vue {
    notification: NotificationModel;
    close(): void;
    get notificationClasses(): {
        warning: boolean;
        error: boolean;
        info: boolean;
        zoomIn: boolean;
        zoomOut: boolean;
    };
    get isError(): boolean;
}
