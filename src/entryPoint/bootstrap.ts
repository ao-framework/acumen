

import { ensureError } from "../commons/errorHandling";
import { iDispatchResponseError } from "../contracts/error/iDispatchResponseError";

/**
 * This is a helper method to create dispatch responses
 * that particularly pertain to error messages
 */
function createErrorResponse() {
    const response = {} as iDispatchResponseError
    response.url = "/error";
    response.userAgent = "@entrypoint"
    response.headers = {
        reason: "conditional"
    }
    response.body = []
    return response;
}

/**
 * This is the listener that first on uncaught exceptions
 * @param rejected 
 */
function uncaughtException(rejected: Error) {
    const error = ensureError(rejected)
    const response = createErrorResponse()
    response.body = error.stack.split("\n");
    response.headers.reason = "uncaughtException";
    process.send(response)
    process.exit(1);
}

/**
 * This the listener that fires on unhandled rejection
 * @param rejected 
 * @param promise 
 */
function unhandledRejection(rejected: Error, promise: Promise<any>) {
    const error = ensureError(rejected)
    const response = createErrorResponse()
    response.body = error.stack.split("\n");
    response.headers.reason = "unhandledRejection";
    process.send(response)
    process.exit(1);
}

/**
 * When using the entry point, it is important to catch all errors
 * as early as possible so that we don't have weird stalls for no
 * reason
 */
export function bootstrapEntrypoint() {
    process.on("uncaughtException", uncaughtException);
    process.on("unhandledRejection", unhandledRejection)
}
