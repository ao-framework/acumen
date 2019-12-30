import { Vue } from 'vue-property-decorator';
export default class Notifications extends Vue {
    notifications: import("../../../client/notifications/notifications").Notifications;
    get containsErrors(): boolean;
}
