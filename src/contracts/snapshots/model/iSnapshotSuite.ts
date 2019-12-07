import { iSnapshotController } from "./iSnapshotController";
import { iSnapshotTest } from "./iSnapshotTest";

export interface iSnapshotSuite {
    name: string;
    breadCrumbs: string[],
    description: string;
    tests: { [key: string]: iSnapshotTest }
    suites: { [key: string]: iSnapshotSuite }
    controller: iSnapshotController;
    containsFailures: boolean;
}
