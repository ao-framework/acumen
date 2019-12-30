"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filesystemValidators_1 = require("../../../../commons/filesystemValidators");
class RepoManager {
    /**
     * Sets up kernel modules to be available
     * @param modules
     */
    constructor(modules) {
        this.modules = modules;
    }
    /**
     * Get the entries files in their relative context
     * @param repo
     */
    getEntries(repo) {
        const context = [repo.baseDirectory, repo.directory];
        return filesystemValidators_1.makeRelativePaths(repo.entries, ...context);
    }
    /**
     * Get the watch files in their relative context
     * @param repo
     */
    getWatches(repo) {
        const context = [repo.baseDirectory, repo.directory];
        return filesystemValidators_1.makeRelativePaths(repo.watches, ...context);
    }
    /**
     * Get the coverage options in their relative context
     * @param repo
     */
    getCoverageOptions(repo) {
        const defaultCoverageOptions = { includeDirectories: [], excludeDirectories: [], includeFiles: [], excludeFiles: [] };
        const coverage = Object.assign(defaultCoverageOptions, repo.coverageOptions);
        const context = [repo.baseDirectory, repo.directory];
        coverage.includeDirectories = filesystemValidators_1.makeRelativePaths(coverage.includeDirectories, ...context);
        coverage.excludeDirectories = filesystemValidators_1.makeRelativePaths(coverage.excludeDirectories, ...context);
        coverage.includeFiles = filesystemValidators_1.makeRelativePaths(coverage.includeFiles, ...context);
        coverage.excludeFiles = filesystemValidators_1.makeRelativePaths(coverage.excludeFiles, ...context);
        return coverage;
    }
    /**
     * Find of fail a directory in the repo's context
     * @param directory
     * @param message
     */
    getRelativeDirectory(directory, message) {
        const path = filesystemValidators_1.relativeToProject(directory);
        filesystemValidators_1.isDirectoryOrFail(path, `The directory ${path} does not exist -- ${message}`);
        return path;
    }
}
exports.RepoManager = RepoManager;
//# sourceMappingURL=repoManager.js.map