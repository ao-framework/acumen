import { Vue } from 'vue-property-decorator';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
export default class SnapshotTest extends Vue {
    test: iSnapshotTest;
    collapsed: boolean;
    get treeStyles(): {
        color: string;
        background: string;
        borderLeft: string;
    };
}
