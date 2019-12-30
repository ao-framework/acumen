import { Vue } from 'vue-property-decorator';
export default class ElevateLogo extends Vue {
    client: import("../../client/client").Client;
    outerColor: string;
    innerColor: string;
    flip: boolean;
    get up(): boolean;
    get flash(): boolean;
    triggerClick(): void;
}
