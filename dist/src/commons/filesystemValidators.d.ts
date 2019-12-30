/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to the Acumen installed node package.
 * @param pathSegments
 */
export declare function relativeToAcumen(...pathSegments: string[]): string;
/**
 * Provide path segments as arguments. It will return a fully qualified
 * path relative to current project using Acumen.
 * @param pathSegments
 */
export declare function relativeToProject(...pathSegments: string[]): string;
/**
 * Provide a fully qualifed path as an argument. It will return a
 * boolean value to let you know if the file exists but also that
 * it is not a directory. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path
 */
export declare function isFile(path: string): boolean;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if it exists. If the
 * file does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path
 * @param message
 */
export declare function isFileOrFail(path: string, message: string): boolean;
/**
 * Provide a fully qualifed path as an argument. It will return a
 * boolean value to let you know if the directory exists but also that
 * it is not a file. Developers are weird animals and I wouldn't
 * put it passed them to create a file without a file extension.
 * @param path
 */
export declare function isDirectory(path: string): boolean;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * return true to make working with if statements easier --if the directory exists. If the
 * directory does not exist, it will throw an error with the message provided. It also
 * provides protection for files without a file extensions.
 * @param path
 * @param message
 */
export declare function isDirectoryOrFail(path: string, message: string): boolean;
/**
 * Provide a fully qualified path and an error message as arguments. It will
 * attempt to read file contents of the path. If the file does not exist, it will
 * throw an error with the message provided. It includes protection against files
 * without file extensions.
 * @param path
 * @param message
 */
export declare function fileContents(path: string, message?: string): Promise<unknown>;
/**
 * Provide a list of paths with context and path segments to prefix as arguments. It will
 * return a mapped list of fully qualified paths.
 * @param paths
 * @param segments
 */
export declare function makeRelativePaths(paths: string[], ...segments: string[]): string[];
