import { Vue } from 'vue-property-decorator';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
export default class SnapshotTestInstance extends Vue {
    collapsed: boolean;
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    get treeStyles(): {
        color: string;
        backgroundImage: string;
        marginBottom: string;
    };
    getBackground(): "radial-gradient(circle,rgba(255, 0, 0, 0.2) 0%,rgba(7, 12, 19, 1) 100%)" | "radial-gradient(circle,rgba(7, 69, 99, 0.2) 0%,rgba(7, 12, 19, 1) 100%)";
    open(): void;
}
