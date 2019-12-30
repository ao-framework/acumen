import { Vue } from 'vue-property-decorator';
import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';
export default class SchemaTest extends Vue {
    client: import("../../../../client/client").Client;
    test: iSchemaTest;
    collapsed: boolean;
    get treeStyles(): {
        color: string;
        background: string;
        borderLeft: string;
    };
    open(): void;
}
