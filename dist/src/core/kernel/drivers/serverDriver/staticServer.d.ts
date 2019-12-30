/// <reference types="node" />
import http from "http";
/**
 * Attempts to clean a url of double dots to prevent
 * streaming files to the client that should be out of bounds
 * @param requestURL
 */
export declare function cleanUrl(requestURL: string): string;
/**
 * Gets the mimetype for a file path
 * @param file
 */
export declare function getMimeType(file: string): any;
/**
 * Handles streaming static assets to client if the file exists
 * @param request
 * @param response
 */
export declare function staticServer(request: http.IncomingMessage, response: http.ServerResponse): void;
