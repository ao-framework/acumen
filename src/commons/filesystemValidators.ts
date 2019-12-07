import { readFile, statSync } from "fs";
import { join } from "path";

/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to the Acumen installed node package.
 * @param pathSegments 
 */
export function relativeToAcumen(...pathSegments: string[]) {
    return join(__dirname, "../../../", ...pathSegments);
}

/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to current project using Acumen.
 * @param pathSegments 
 */
export function relativeToProject(...pathSegments: string[]) {
    return join(process.cwd(), ...pathSegments);
}

/**
 * Provide a fully qualifed path as an argument. It will return a 
 * boolean value to let you know if the file exists but also that
 * it is not a directory. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path 
 */
export function isFile(path: string) {
    try {
        return statSync(path).isDirectory() === false;
    } catch (err) {
        return false;
    }
}

/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if it exists. If the
 * file does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path 
 * @param message 
 */
export function isFileOrFail(path: string, message: string) {
    if (!isFile(path)) {
        throw new Error(message);
    }
    return true;
}

/**
 * Provide a fully qualifed path as an argument. It will return a 
 * boolean value to let you know if the directory exists but also that
 * it is not a file. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path 
 */
export function isDirectory(path: string) {
    try {
        return statSync(path).isDirectory()
    } catch (err) {
        return false;
    }
}

/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if the directory exists. If the
 * directory does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path 
 * @param message 
 */
export function isDirectoryOrFail(path: string, message: string) {
    if (!isDirectory(path)) {
        throw new Error(message);
    }
    return true;
}

/**
 * Provide a fully qualified path and an error message as arguments. It will
 * attempt to read file contents of the path. If the file does not exist, it will
 * throw an error with the message provided. It includes protection against files
 * without file extensions.
 * @param path 
 * @param message 
 */
export async function fileContents(path: string, message: string = "") {
    isFileOrFail(path, message)
    return new Promise((done, error) => {
        readFile(path, "utf8", (err, contents) => {
            if (err) { error(err); return; }
            done(contents);
        })
    })
}

/**
 * Provide a list of paths with context and path segments to prefix as arguments. It will
 * return a mapped list of fully qualified paths.
 * @param paths 
 * @param segments 
 */
export function makeRelativePaths(paths: string[], ...segments: string[]) {
    return paths.map(path => join(...segments, path))
}
