import { Vue } from 'vue-property-decorator';
import { iSnapshotTest } from "../../../../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../../../../contracts/snapshots/model/iSnapshotTestInstance";
export default class SnapshotTestInstanceButtons extends Vue {
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    open(): void;
}
