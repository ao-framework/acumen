

import { isDirectoryOrFail, makeRelativePaths, relativeToProject } from "../../../../commons/filesystemValidators";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { RepoEnvironment } from "../../../configuration/base/repoEnvironment";
import { KernelModules } from "../../kernelModules";

export class RepoManager {

    /**
     * Sets up kernel modules to be available
     * @param modules 
     */
    public constructor(private modules: KernelModules) { }

    /**
     * Get the entries files in their relative context
     * @param repo 
     */
    public getEntries(repo: RepoEnvironment) {
        const context = [repo.baseDirectory, repo.directory]
        return makeRelativePaths(repo.entries, ...context);
    }

    /**
     * Get the watch files in their relative context
     * @param repo 
     */
    public getWatches(repo: RepoEnvironment) {
        const context = [repo.baseDirectory, repo.directory]
        return makeRelativePaths(repo.watches, ...context);
    }

    /**
     * Get the coverage options in their relative context
     * @param repo 
     */
    public getCoverageOptions(repo: RepoEnvironment): iCoverageOptions {
        const defaultCoverageOptions = { includeDirectories: [], excludeDirectories: [], includeFiles: [], excludeFiles: [] }
        const coverage = Object.assign(defaultCoverageOptions, repo.coverageOptions);
        const context = [repo.baseDirectory, repo.directory];
        coverage.includeDirectories = makeRelativePaths(coverage.includeDirectories, ...context);
        coverage.excludeDirectories = makeRelativePaths(coverage.excludeDirectories, ...context);
        coverage.includeFiles = makeRelativePaths(coverage.includeFiles, ...context);
        coverage.excludeFiles = makeRelativePaths(coverage.excludeFiles, ...context);
        return coverage;
    }

    /**
     * Find of fail a directory in the repo's context
     * @param directory 
     * @param message 
     */
    public getRelativeDirectory(directory: string, message?: string) {
        const path = relativeToProject(directory)
        isDirectoryOrFail(path, `The directory ${path} does not exist -- ${message}`);
        return path;
    }


}
