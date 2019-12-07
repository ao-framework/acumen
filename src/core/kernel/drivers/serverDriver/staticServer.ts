import { createReadStream, existsSync } from "fs";
import http from "http";
import url from "url";

import { relativeToAcumen } from "../../../../commons/filesystemValidators";
import { mimeTypes } from "./mimeTypes";

/**
 * Attempts to clean a url of double dots to prevent
 * streaming files to the client that should be out of bounds
 * @param requestURL 
 */
export function cleanUrl(requestURL: string) {
    const data = url.parse(requestURL);
    let p = data.pathname
        .replace(/\.\.\//g, "")
        .replace(/\.\//g, "")
        .substr(1)
    return p === "" ? "index.html" : p
}

/**
 * Gets the mimetype for a file path
 * @param file 
 */
export function getMimeType(file: string) {
    const ext = file.split(".").pop();
    if (typeof mimeTypes[ext] === "string") {
        return mimeTypes[ext];
    }
    return "application/octet-stream"
}

/**
 * Handles streaming static assets to client if the file exists
 * @param request 
 * @param response 
 */
export function staticServer(request: http.IncomingMessage, response: http.ServerResponse) {
    const path = relativeToAcumen("public/server", cleanUrl(request.url))
    if (existsSync(path)) {
        const stream = createReadStream(path);
        response.setHeader("Content-Type", getMimeType(path));
        response.writeHead(200)
        stream.pipe(response);
    } else {
        response.writeHead(404);
        response.end();
    }
}
