/**
 * Get the short path by remove the current working directory of the 
 * developer's codebase to shorten the length of the path.
 * @param entry 
 * @param currentWorkingDirectory 
 */
export function getShortPath(entry: string, currentWorkingDirectory: string) {
    return entry.replace(currentWorkingDirectory, "");
}

/**
 * Convert the entry file path to the base64 version
 * @param entry 
 */
export function getBase64(entry: string) {
    return btoa(entry)
}
