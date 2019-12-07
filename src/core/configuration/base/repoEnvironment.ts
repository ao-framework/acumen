import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";

export class RepoEnvironment {
    public baseDirectory: string = process.cwd();
    public directory: string = "";
    public entries: string[] = [];
    public watches: string[] = [];
    public coverageOptions: iCoverageOptions;
}
