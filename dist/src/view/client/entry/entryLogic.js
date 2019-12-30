"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the short path by remove the current working directory of the
 * developer's codebase to shorten the length of the path.
 * @param entry
 * @param currentWorkingDirectory
 */
function getShortPath(entry, currentWorkingDirectory) {
    return entry.replace(currentWorkingDirectory, "");
}
exports.getShortPath = getShortPath;
/**
 * Convert the entry file path to the base64 version
 * @param entry
 */
function getBase64(entry) {
    return btoa(entry);
}
exports.getBase64 = getBase64;
//# sourceMappingURL=entryLogic.js.map