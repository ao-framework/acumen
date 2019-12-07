import { readdirSync } from "fs";
import inspector from "inspector";
import { join, sep } from "path";

import { ensureArray } from "../../../commons/coolKids";
import { isDirectory, isDirectoryOrFail } from "../../../commons/filesystemValidators";
import { iCoverageDirectory } from "../../../contracts/coverage/model/iCoverageDirectory";
import { iCoverageFile } from "../../../contracts/coverage/model/iCoverageFile";
import { iDispatchRequestCoverage } from "../../../contracts/coverage/request/iDispatchRequestCoverage";
import { generateTable } from "./coverageProfiler";
import { findScriptCoverage } from "./coverageStats";

/**
 * Provide the DispatchRequest and the Node js inspector's coverage report as arguments. It will
 * remap to directory structure and resolve it.
 * @param request 
 * @param coverage 
 */
export async function createCoverageReport(request: iDispatchRequestCoverage, coverage: inspector.Profiler.TakePreciseCoverageReturnType) {
    const includeDirectories = ensureArray(request.body.includeDirectories)
    const excludeDirectories = ensureArray(request.body.excludeDirectories)
    const includeFiles = ensureArray(request.body.includeFiles)
    const excludeFiles = ensureArray(request.body.excludeFiles)
    const table = generateTable(coverage);
    const rootDirectory = makeCoverageDirectory("root")
    rootDirectory.directories = includeDirectories.map(directory => getDirectory(directory, excludeDirectories, excludeFiles, true));
    rootDirectory.files = includeFiles.map(file => makeCoverageFile(file))
    return findScriptCoverage(rootDirectory, table).then(() => rootDirectory);
}

/**
 * Provide the directory path that coverage is to be taken on, list of directories to exclude, 
 * list of files to exclude, and boolean value (whether to fail if directory does not exist) 
 * as arguments. It will map out the directory structure and return it. 
 * @param directoryPath 
 * @param excludeDirectories 
 * @param excludeFiles 
 * @param root 
 */
export function getDirectory(directoryPath: string, excludeDirectories: string[], excludeFiles: string[], root: boolean = false) {
    if (root) {
        isDirectoryOrFail(directoryPath,
            `Whilst trying to organize coverage, we found that the root directory "${directoryPath}" does not exist.`)
    }
    const directory = makeCoverageDirectory(directoryPath)
    const files = readdirSync(directory.path)
    files.forEach(file => {
        const path = join(directory.path, file)
        if (isDirectory(path)) {
            if (!excludeDirectories.includes(path)) {
                directory.directories.push(getDirectory(path, excludeDirectories, excludeFiles));
            }
        } else {
            if (!excludeFiles.includes(path)) {
                const file = makeCoverageFile(path)
                if (file.transpiledExtension === "js") {
                    directory.files.push(file);
                }
            }
        }
    })
    return directory;
}

/**
 * Provide a file path as argument. It will create and return an 
 * corresponding iCoverageFile
 * @param path 
 */
export function makeCoverageFile(path: string) {
    const file = {} as iCoverageFile
    file.fileName = path.split(sep).pop().split(".").shift();
    file.transpiledPath = path;
    file.transpiledExtension = path.split(".").pop();
    return file;
}

/**
 * Provide a directory path as argument. It will create and return an 
 * corresponding iCoverageDirectory
 * @param path 
 */
export function makeCoverageDirectory(path: string) {
    const directory = {} as iCoverageDirectory;
    directory.path = path;
    directory.name = path.split(sep).pop();
    directory.directories = []
    directory.files = [];
    return directory;
}





