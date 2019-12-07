import { iCoverageFile } from "./iCoverageFile";

export interface iCoverageDirectory {
    path: string;
    name: string;
    directories: iCoverageDirectory[]
    files: iCoverageFile[]
}
