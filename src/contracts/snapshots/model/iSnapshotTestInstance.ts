import { iVariableDiagram } from "../../base/iVariableDiagram";
import { iSnapshotSpotlight } from "./iSnapshotSpotlight";
import { iSnapshotWarning } from "./iSnapshotWarning";

export interface iSnapshotTestInstance {
    id: string;
    type: string;
    callerSuiteName: string;
    callerTestCommand: string;
    testCommand: string;
    start: number;
    end: number;
    time: number;
    error?: string[];
    spotlights: iSnapshotSpotlight[];
    warnings: iSnapshotWarning[];
    args: iVariableDiagram[];
    breadCrumbs: string[];
    log: string[];
}
