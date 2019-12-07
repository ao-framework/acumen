import { iCoverageOptions } from "../coverage/request/iCoverageOptions";

export interface iClientManifest {
    entries: string[];
    currentWorkingDirectory: string;
    coverageOptions: iCoverageOptions
}
