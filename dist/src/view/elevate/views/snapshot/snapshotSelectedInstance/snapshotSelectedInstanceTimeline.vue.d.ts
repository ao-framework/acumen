import { Vue } from 'vue-property-decorator';
import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
import { iSnapshotSpotlight } from 'contracts/snapshots/model/iSnapshotSpotlight';
import { iSnapshotWarning } from 'contracts/snapshots/model/iSnapshotWarning';
export default class SnapshotSelectedInstanceTimeline extends Vue {
    instance: iSnapshotTestInstance;
    test: iSnapshotTest;
    showing: boolean;
    toggle(): void;
    testStart(): {
        label: string;
        time: number;
    };
    testEnd(time: number): {
        label: string;
        time: number;
    };
    spotlight(spotlight: iSnapshotSpotlight, offset: number): {
        label: string;
        time: number;
    };
    warning(warning: iSnapshotWarning, offset: number): {
        label: string;
        time: number;
    };
    get items(): any[];
}
