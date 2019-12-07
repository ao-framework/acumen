import { iSnapshotSuiteInformation } from "./iSnapshotSuiteInformation";
import { iSnapshotTestInstance } from "./iSnapshotTestInstance";

export interface iSnapshotTest {
    command: string;
    description: string;
    timeout: number;
    suiteInformation: iSnapshotSuiteInformation;
    instances: iSnapshotTestInstance[];
    containsFailures: boolean;
    breadCrumbs: string[];
}
