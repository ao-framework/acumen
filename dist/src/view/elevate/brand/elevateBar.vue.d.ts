import { Vue } from 'vue-property-decorator';
export default class ElevateBar extends Vue {
    client: import("../../client/client").Client;
    get loading(): boolean;
}
