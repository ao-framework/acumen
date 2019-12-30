import { Vue } from 'vue-property-decorator';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
export default class SnapshotTestInstanceBar extends Vue {
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
}
