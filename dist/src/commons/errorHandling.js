"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filters_1 = require("../core/processor/filters");
/**
 * Provide the error message and a global namespace as arguments. It will throw
 * an exception at the factory level for easy changes at a later date.
 * @param message
 * @param namespace
 */
function throwExpection(message, namespace = "Acumen") {
    const error = new Error(`[${namespace}] ${message}`);
    error["type"] = "Acumen Error";
    throw error;
}
exports.throwExpection = throwExpection;
function splitError(err) {
    return filters_1.filterLines(err.stack.split("\n"));
}
exports.splitError = splitError;
function stopProccessIfAcumenError(error) {
    if (error["type"] === "Acumen Error") {
        delete error["type"];
        console.error(error);
        process.exit(1);
    }
}
exports.stopProccessIfAcumenError = stopProccessIfAcumenError;
/**
 * Provide any variable as argument. It will attempt to convert it to a
 * fully qualified Error instance
 * @param variable
 */
function ensureError(variable) {
    return variable instanceof Error ?
        variable :
        new Error(JSON.stringify(variable));
}
exports.ensureError = ensureError;
//# sourceMappingURL=errorHandling.js.map