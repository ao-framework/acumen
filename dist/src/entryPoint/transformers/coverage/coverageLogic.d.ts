/// <reference types="node" />
import inspector from "inspector";
import { iCoverageDirectory } from "../../../contracts/coverage/model/iCoverageDirectory";
import { iCoverageFile } from "../../../contracts/coverage/model/iCoverageFile";
import { iDispatchRequestCoverage } from "../../../contracts/coverage/request/iDispatchRequestCoverage";
/**
 * Provide the DispatchRequest and the Node js inspector's coverage report as arguments. It will
 * remap to directory structure and resolve it.
 * @param request
 * @param coverage
 */
export declare function createCoverageReport(request: iDispatchRequestCoverage, coverage: inspector.Profiler.TakePreciseCoverageReturnType): Promise<iCoverageDirectory>;
/**
 * Provide the directory path that coverage is to be taken on, list of directories to exclude,
 * list of files to exclude, and boolean value (whether to fail if directory does not exist)
 * as arguments. It will map out the directory structure and return it.
 * @param directoryPath
 * @param excludeDirectories
 * @param excludeFiles
 * @param root
 */
export declare function getDirectory(directoryPath: string, excludeDirectories: string[], excludeFiles: string[], root?: boolean): iCoverageDirectory;
/**
 * Provide a file path as argument. It will create and return an
 * corresponding iCoverageFile
 * @param path
 */
export declare function makeCoverageFile(path: string): iCoverageFile;
/**
 * Provide a directory path as argument. It will create and return an
 * corresponding iCoverageDirectory
 * @param path
 */
export declare function makeCoverageDirectory(path: string): iCoverageDirectory;
