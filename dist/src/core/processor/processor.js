"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const filesystemValidators_1 = require("../../commons/filesystemValidators");
const queue_1 = require("../../commons/queue");
/**
 * Constant to hold a table of queues for each individual path
 */
exports.queues = {};
/**
 * Provide the an array in which messages can be logged, a child process instance, and the path of the child process as
 * arguments. It will write a message to the message log the new process had been forked.
 * @param messages
 * @param childProcess
 * @param path
 */
function processForkedMessage(messages, childProcess, path) {
    messages.push(`<cyan>[${childProcess.pid}]</cyan> Forked: <magenta>${path}</magenta>`);
}
exports.processForkedMessage = processForkedMessage;
/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchRequest as arguments. It will write a message to the message log that a request has been sent
 * the child process
 * @param messages
 * @param childProcess
 * @param path
 * @param request
 */
function processMessageSend(messages, childProcess, path, request) {
    const segments = [
        `<cyan>[${childProcess.pid}]</cyan>`,
        `<gray>${request.url}</gray>`,
        `Request was sent to:`,
        `<magenta>${path}</magenta>`
    ];
    messages.push(segments.join(" "));
}
exports.processMessageSend = processMessageSend;
/**
 * Provide the an array in which messages can be logged, a child process instance, the path of the child process,
 * and the DispatchResponse as arguments. It will write a message to the message log that a response has been received
 * @param messages
 * @param childProcess
 * @param path
 * @param response
 */
function processMessageReceived(messages, childProcess, path, response) {
    const segments = [
        `<cyan>[${childProcess.pid}]</cyan>`,
        `<gray>${response.url}</gray>`,
        `Response was received from:`,
        `<magenta>${path}</magenta>`
    ];
    messages.push(segments.join(" "));
    if (childProcess.killed) {
        messages.push(`<cyan>[${childProcess.pid}]</cyan> Terminated`);
    }
    else {
        messages.push(`<cyan>[${childProcess.pid}]</cyan> Rogue Process`);
    }
}
exports.processMessageReceived = processMessageReceived;
/**
 * Provide a path to the entry file, the Dispatch request, and message log array as arguments. It will fork the entry
 * file, send the request, log to the message log array, and resolve DispatchResponse
 * @param path
 * @param request
 * @param messages
 */
function callEntry(path, request, messages = []) {
    return new Promise((resolve) => {
        // make sure that a queue exists for the path
        if (!exports.queues[path]) {
            exports.queues[path] = new queue_1.Queue();
        }
        // push the current item into the queue for that path
        exports.queues[path].push(() => new Promise((resolveQueue) => {
            filesystemValidators_1.isFileOrFail(path, `Could not fork path "${path}"`);
            const pathProcess = child_process_1.fork(path);
            processForkedMessage(messages, pathProcess, path);
            pathProcess.on("message", (response) => {
                pathProcess.kill();
                resolveQueue();
                processMessageReceived(messages, pathProcess, path, response);
                resolve(response);
            });
            pathProcess.on("error", (err) => {
                pathProcess.kill();
                const response = {};
                response.url = "/error";
                response.headers = { reason: 'uncaughtException' };
                response.body = err.stack.split("\n");
                resolveQueue();
                processMessageReceived(messages, pathProcess, path, response);
                resolve(response);
            });
            pathProcess.send(request);
            processMessageSend(messages, pathProcess, path, request);
        }));
    });
}
exports.callEntry = callEntry;
//# sourceMappingURL=processor.js.map