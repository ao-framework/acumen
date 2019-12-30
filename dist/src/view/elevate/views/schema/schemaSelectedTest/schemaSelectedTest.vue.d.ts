import { Vue } from 'vue-property-decorator';
import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';
export default class SchemaSelectedTest extends Vue {
    client: import("../../../../client/client").Client;
    test: iSchemaTest;
}
