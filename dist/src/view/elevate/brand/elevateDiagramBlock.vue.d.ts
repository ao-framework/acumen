import { Vue } from 'vue-property-decorator';
import { iVariableDiagram } from "../../../contracts/base/iVariableDiagram";
export default class ElevateDiagramBlock extends Vue {
    collapsed: boolean;
    diagram: iVariableDiagram;
    indexKey: string;
    get hasChildren(): boolean;
}
