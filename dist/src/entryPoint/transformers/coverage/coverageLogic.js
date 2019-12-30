"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const coolKids_1 = require("../../../commons/coolKids");
const filesystemValidators_1 = require("../../../commons/filesystemValidators");
const coverageProfiler_1 = require("./coverageProfiler");
const coverageStats_1 = require("./coverageStats");
/**
 * Provide the DispatchRequest and the Node js inspector's coverage report as arguments. It will
 * remap to directory structure and resolve it.
 * @param request
 * @param coverage
 */
async function createCoverageReport(request, coverage) {
    const includeDirectories = coolKids_1.ensureArray(request.body.includeDirectories);
    const excludeDirectories = coolKids_1.ensureArray(request.body.excludeDirectories);
    const includeFiles = coolKids_1.ensureArray(request.body.includeFiles);
    const excludeFiles = coolKids_1.ensureArray(request.body.excludeFiles);
    const table = coverageProfiler_1.generateTable(coverage);
    const rootDirectory = makeCoverageDirectory("root");
    rootDirectory.directories = includeDirectories.map(directory => getDirectory(directory, excludeDirectories, excludeFiles, true));
    rootDirectory.files = includeFiles.map(file => makeCoverageFile(file));
    return coverageStats_1.findScriptCoverage(rootDirectory, table).then(() => rootDirectory);
}
exports.createCoverageReport = createCoverageReport;
/**
 * Provide the directory path that coverage is to be taken on, list of directories to exclude,
 * list of files to exclude, and boolean value (whether to fail if directory does not exist)
 * as arguments. It will map out the directory structure and return it.
 * @param directoryPath
 * @param excludeDirectories
 * @param excludeFiles
 * @param root
 */
function getDirectory(directoryPath, excludeDirectories, excludeFiles, root = false) {
    if (root) {
        filesystemValidators_1.isDirectoryOrFail(directoryPath, `Whilst trying to organize coverage, we found that the root directory "${directoryPath}" does not exist.`);
    }
    const directory = makeCoverageDirectory(directoryPath);
    const files = fs_1.readdirSync(directory.path);
    files.forEach(file => {
        const path = path_1.join(directory.path, file);
        if (filesystemValidators_1.isDirectory(path)) {
            if (!excludeDirectories.includes(path)) {
                directory.directories.push(getDirectory(path, excludeDirectories, excludeFiles));
            }
        }
        else {
            if (!excludeFiles.includes(path)) {
                const file = makeCoverageFile(path);
                if (file.transpiledExtension === "js") {
                    directory.files.push(file);
                }
            }
        }
    });
    return directory;
}
exports.getDirectory = getDirectory;
/**
 * Provide a file path as argument. It will create and return an
 * corresponding iCoverageFile
 * @param path
 */
function makeCoverageFile(path) {
    const file = {};
    file.fileName = path.split(path_1.sep).pop().split(".").shift();
    file.transpiledPath = path;
    file.transpiledExtension = path.split(".").pop();
    return file;
}
exports.makeCoverageFile = makeCoverageFile;
/**
 * Provide a directory path as argument. It will create and return an
 * corresponding iCoverageDirectory
 * @param path
 */
function makeCoverageDirectory(path) {
    const directory = {};
    directory.path = path;
    directory.name = path.split(path_1.sep).pop();
    directory.directories = [];
    directory.files = [];
    return directory;
}
exports.makeCoverageDirectory = makeCoverageDirectory;
//# sourceMappingURL=coverageLogic.js.map