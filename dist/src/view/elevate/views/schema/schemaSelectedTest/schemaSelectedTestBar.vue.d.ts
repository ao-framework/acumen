import { Vue } from 'vue-property-decorator';
import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';
export default class SchemaSelectedTestBar extends Vue {
    test: iSchemaTest;
    get name(): string;
    close(): void;
}
