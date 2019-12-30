import { Vue } from 'vue-property-decorator';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
export default class SnapshotTestInstanceErrorManager extends Vue {
    client: import("../../../../../client/client").Client;
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    get lines(): string[];
}
