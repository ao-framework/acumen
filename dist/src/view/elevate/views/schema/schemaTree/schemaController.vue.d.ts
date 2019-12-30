import { Vue } from 'vue-property-decorator';
import { iSchemaController } from 'contracts/schema/model/iSchemaController';
export default class SchemaController extends Vue {
    controller: iSchemaController;
    get treeStyles(): {
        borderLeft: string;
        color: string;
        background: string;
    };
    open(): void;
}
