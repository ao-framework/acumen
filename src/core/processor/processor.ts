import { ChildProcess, fork } from "child_process";

import { isFileOrFail } from "../../commons/filesystemValidators";
import { Queue } from "../../commons/queue";
import { iCallEntryCache } from "../../contracts/base/iCallEntryCache";
import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { iDispatchResponse } from "../../contracts/dispatch/iDispatchResponse";
import { iDispatchResponseError } from "../../contracts/error/iDispatchResponseError";

type iRequest = iDispatchRequest<any, any>;
type iResponse = iDispatchResponse<any, any>

/**
 * Constant to hold a table of queues for each individual path
 */
export const queues: iCallEntryCache = {}

/**
 * Provide the an array in which messages can be logged, a child process instance, and the path of the child process as 
 * arguments. It will write a message to the message log the new process had been forked.
 * @param messages 
 * @param childProcess 
 * @param path 
 */
export function processForkedMessage(messages: string[], childProcess: ChildProcess, path: string) {
    messages.push(`<cyan>[${childProcess.pid}]</cyan> Forked: <magenta>${path}</magenta>`)
}

/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchRequest as arguments. It will write a message to the message log that a request has been sent
 * the child process
 * @param messages 
 * @param childProcess 
 * @param path 
 * @param request 
 */
export function processMessageSend(messages: string[], childProcess: ChildProcess, path: string, request: iDispatchRequest<any, any>) {
    const segments = [
        `<cyan>[${childProcess.pid}]</cyan>`,
        `<gray>${request.url}</gray>`,
        `Request was sent to:`,
        `<magenta>${path}</magenta>`
    ]
    messages.push(segments.join(" "))
}

/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchResponse as arguments. It will write a message to the message log that a response has been received
 * @param messages 
 * @param childProcess 
 * @param path 
 * @param response 
 */
export function processMessageReceived(messages: string[], childProcess: ChildProcess, path: string, response: iDispatchResponse<any, any>) {
    const segments = [
        `<cyan>[${childProcess.pid}]</cyan>`,
        `<gray>${response.url}</gray>`,
        `Response was received from:`,
        `<magenta>${path}</magenta>`
    ]
    messages.push(segments.join(" "))
    if (childProcess.killed) {
        messages.push(`<cyan>[${childProcess.pid}]</cyan> Terminated`)
    } else {
        messages.push(`<cyan>[${childProcess.pid}]</cyan> Rogue Process`)
    }
}

/**
 * Provide a path to the entry file, the Dispatch request, and message log array as arguments. It will fork the entry
 * file, send the request, log to the message log array, and resolve DispatchResponse
 * @param path 
 * @param request 
 * @param messages 
 */
export function callEntry(path: string, request: iRequest, messages: string[] = []): Promise<iResponse> {
    return new Promise((resolve) => {
        // make sure that a queue exists for the path
        if (!queues[path]) { queues[path] = new Queue(); }

        // push the current item into the queue for that path
        queues[path].push(() => new Promise((resolveQueue) => {
            isFileOrFail(path, `Could not fork path "${path}"`);
            const pathProcess = fork(path);
            processForkedMessage(messages, pathProcess, path);
            pathProcess.on("message", (response: iResponse) => {
                pathProcess.kill();
                resolveQueue();
                processMessageReceived(messages, pathProcess, path, response);
                resolve(response)
            })
            pathProcess.on("error", (err) => {
                pathProcess.kill();
                const response = {} as iDispatchResponseError;
                response.url = "/error";
                response.headers = { reason: 'uncaughtException' }
                response.body = err.stack.split("\n");
                resolveQueue();
                processMessageReceived(messages, pathProcess, path, response);
                resolve(response);
            })
            pathProcess.send(request);
            processMessageSend(messages, pathProcess, path, request);
        }))
    })
}
