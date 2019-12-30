import { Vue } from 'vue-property-decorator';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
export default class SnapshotSelectedInstanceArgumentsStream extends Vue {
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    showing: boolean;
    toggle(): void;
}
