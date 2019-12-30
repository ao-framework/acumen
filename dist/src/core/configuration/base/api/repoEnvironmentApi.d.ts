import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { RepoEnvironment } from "../repoEnvironment";
export declare class RepoEnvironmentApi {
    private repo;
    constructor(repo: RepoEnvironment);
    directory(directory: string): this;
    entry(relativePath: string): this;
    watch(relativePath: string): this;
    coverageOptions(options: iCoverageOptions): void;
}
