import { Vue } from 'vue-property-decorator';
export default class Schema extends Vue {
    client: import("../../../client/client").Client;
    mounted(): void;
}
