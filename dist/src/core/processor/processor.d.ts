/// <reference types="node" />
import { ChildProcess } from "child_process";
import { iCallEntryCache } from "../../contracts/base/iCallEntryCache";
import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { iDispatchResponse } from "../../contracts/dispatch/iDispatchResponse";
declare type iRequest = iDispatchRequest<any, any>;
declare type iResponse = iDispatchResponse<any, any>;
/**
 * Constant to hold a table of queues for each individual path
 */
export declare const queues: iCallEntryCache;
/**
 * Provide the an array in which messages can be logged, a child process instance, and the path of the child process as
 * arguments. It will write a message to the message log the new process had been forked.
 * @param messages
 * @param childProcess
 * @param path
 */
export declare function processForkedMessage(messages: string[], childProcess: ChildProcess, path: string): void;
/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchRequest as arguments. It will write a message to the message log that a request has been sent
 * the child process
 * @param messages
 * @param childProcess
 * @param path
 * @param request
 */
export declare function processMessageSend(messages: string[], childProcess: ChildProcess, path: string, request: iDispatchRequest<any, any>): void;
/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchResponse as arguments. It will write a message to the message log that a response has been received
 * @param messages
 * @param childProcess
 * @param path
 * @param response
 */
export declare function processMessageReceived(messages: string[], childProcess: ChildProcess, path: string, response: iDispatchResponse<any, any>): void;
/**
 * Provide a path to the entry file, the Dispatch request, and message log array as arguments. It will fork the entry
 * file, send the request, log to the message log array, and resolve DispatchResponse
 * @param path
 * @param request
 * @param messages
 */
export declare function callEntry(path: string, request: iRequest, messages?: string[]): Promise<iResponse>;
export {};
