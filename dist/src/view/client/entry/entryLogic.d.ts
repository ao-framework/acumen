/**
 * Get the short path by remove the current working directory of the
 * developer's codebase to shorten the length of the path.
 * @param entry
 * @param currentWorkingDirectory
 */
export declare function getShortPath(entry: string, currentWorkingDirectory: string): string;
/**
 * Convert the entry file path to the base64 version
 * @param entry
 */
export declare function getBase64(entry: string): string;
