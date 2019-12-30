import { Vue } from 'vue-property-decorator';
export default class Snapshot extends Vue {
    client: import("../../../client/client").Client;
    mounted(): void;
}
