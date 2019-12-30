import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { RepoEnvironment } from "../../../configuration/base/repoEnvironment";
import { KernelModules } from "../../kernelModules";
export declare class RepoManager {
    private modules;
    /**
     * Sets up kernel modules to be available
     * @param modules
     */
    constructor(modules: KernelModules);
    /**
     * Get the entries files in their relative context
     * @param repo
     */
    getEntries(repo: RepoEnvironment): string[];
    /**
     * Get the watch files in their relative context
     * @param repo
     */
    getWatches(repo: RepoEnvironment): string[];
    /**
     * Get the coverage options in their relative context
     * @param repo
     */
    getCoverageOptions(repo: RepoEnvironment): iCoverageOptions;
    /**
     * Find of fail a directory in the repo's context
     * @param directory
     * @param message
     */
    getRelativeDirectory(directory: string, message?: string): string;
}
