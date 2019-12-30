import { Vue } from 'vue-property-decorator';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
export default class SnapshotController extends Vue {
    controller: iSnapshotTest;
    collapsed: boolean;
    get treeStyles(): {
        borderLeft: string;
        color: string;
        background: string;
    };
}
