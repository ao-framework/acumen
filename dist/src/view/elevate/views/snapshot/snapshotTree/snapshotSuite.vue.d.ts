import { Vue } from 'vue-property-decorator';
import { iSnapshotSuite } from 'contracts/snapshots/model/iSnapshotSuite';
export default class SnapshotSuite extends Vue {
    suite: iSnapshotSuite;
    collapsed: boolean;
    get totemColor(): "deepskyblue" | "red";
    treeStyles: {
        color: string;
        background: string;
    };
}
