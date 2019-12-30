import { Vue } from 'vue-property-decorator';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
export default class SnapshotTestInstanceReference extends Vue {
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    get nameTokens(): string[];
}
