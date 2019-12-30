import { Vue } from 'vue-property-decorator';
import { iSchemaSuite } from 'contracts/schema/model/iSchemaSuite';
export default class SchemaSuite extends Vue {
    suite: iSchemaSuite;
    collapsed: boolean;
    treeStyles: {
        color: string;
        background: string;
    };
}
