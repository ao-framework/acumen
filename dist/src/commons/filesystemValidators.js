"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to the Acumen installed node package.
 * @param pathSegments
 */
function relativeToAcumen(...pathSegments) {
    return path_1.join(__dirname, "../../../", ...pathSegments);
}
exports.relativeToAcumen = relativeToAcumen;
/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to current project using Acumen.
 * @param pathSegments
 */
function relativeToProject(...pathSegments) {
    return path_1.join(process.cwd(), ...pathSegments);
}
exports.relativeToProject = relativeToProject;
/**
 * Provide a fully qualifed path as an argument. It will return a
 * boolean value to let you know if the file exists but also that
 * it is not a directory. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path
 */
function isFile(path) {
    try {
        return fs_1.statSync(path).isDirectory() === false;
    }
    catch (err) {
        return false;
    }
}
exports.isFile = isFile;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if it exists. If the
 * file does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path
 * @param message
 */
function isFileOrFail(path, message) {
    if (!isFile(path)) {
        throw new Error(message);
    }
    return true;
}
exports.isFileOrFail = isFileOrFail;
/**
 * Provide a fully qualifed path as an argument. It will return a
 * boolean value to let you know if the directory exists but also that
 * it is not a file. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path
 */
function isDirectory(path) {
    try {
        return fs_1.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.isDirectory = isDirectory;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if the directory exists. If the
 * directory does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path
 * @param message
 */
function isDirectoryOrFail(path, message) {
    if (!isDirectory(path)) {
        throw new Error(message);
    }
    return true;
}
exports.isDirectoryOrFail = isDirectoryOrFail;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * attempt to read file contents of the path. If the file does not exist, it will
 * throw an error with the message provided. It includes protection against files
 * without file extensions.
 * @param path
 * @param message
 */
async function fileContents(path, message = "") {
    isFileOrFail(path, message);
    return new Promise((done, error) => {
        fs_1.readFile(path, "utf8", (err, contents) => {
            if (err) {
                error(err);
                return;
            }
            done(contents);
        });
    });
}
exports.fileContents = fileContents;
/**
 * Provide a list of paths with context and path segments to prefix as arguments. It will
 * return a mapped list of fully qualified paths.
 * @param paths
 * @param segments
 */
function makeRelativePaths(paths, ...segments) {
    return paths.map(path => path_1.join(...segments, path));
}
exports.makeRelativePaths = makeRelativePaths;
//# sourceMappingURL=filesystemValidators.js.map