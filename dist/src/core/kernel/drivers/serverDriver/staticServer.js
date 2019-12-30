"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const url_1 = tslib_1.__importDefault(require("url"));
const filesystemValidators_1 = require("../../../../commons/filesystemValidators");
const mimeTypes_1 = require("./mimeTypes");
/**
 * Attempts to clean a url of double dots to prevent
 * streaming files to the client that should be out of bounds
 * @param requestURL
 */
function cleanUrl(requestURL) {
    const data = url_1.default.parse(requestURL);
    let p = data.pathname
        .replace(/\.\.\//g, "")
        .replace(/\.\//g, "")
        .substr(1);
    return p === "" ? "index.html" : p;
}
exports.cleanUrl = cleanUrl;
/**
 * Gets the mimetype for a file path
 * @param file
 */
function getMimeType(file) {
    const ext = file.split(".").pop();
    if (typeof mimeTypes_1.mimeTypes[ext] === "string") {
        return mimeTypes_1.mimeTypes[ext];
    }
    return "application/octet-stream";
}
exports.getMimeType = getMimeType;
/**
 * Handles streaming static assets to client if the file exists
 * @param request
 * @param response
 */
function staticServer(request, response) {
    const path = filesystemValidators_1.relativeToAcumen("public/server", cleanUrl(request.url));
    if (fs_1.existsSync(path)) {
        const stream = fs_1.createReadStream(path);
        response.setHeader("Content-Type", getMimeType(path));
        response.writeHead(200);
        stream.pipe(response);
    }
    else {
        response.writeHead(404);
        response.end();
    }
}
exports.staticServer = staticServer;
//# sourceMappingURL=staticServer.js.map