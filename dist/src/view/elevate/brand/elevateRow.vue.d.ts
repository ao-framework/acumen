import { Vue } from 'vue-property-decorator';
export default class ElevateRow extends Vue {
    breakPoint: number;
    windowSize: number;
    get rowClasses(): {
        break: boolean;
    };
    mounted(): void;
    setSize(): void;
    destroy(): void;
}
