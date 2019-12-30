import { Vue } from 'vue-property-decorator';
import "codemirror/mode/javascript/javascript.js";
export default class ElevateCodeEditor extends Vue {
    type: string;
    code: string;
    selections: any[];
    setSelections(cm: any): void;
    mounted(): void;
}
