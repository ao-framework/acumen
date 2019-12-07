import { filterLines } from "../core/processor/filters";

/**
 * Provide the error message and a global namespace as arguments. It will throw
 * an exception at the factory level for easy changes at a later date.
 * @param message 
 * @param namespace 
 */
export function throwExpection(message: string, namespace: string = "Acumen") {
    const error = new Error(`[${namespace}] ${message}`);
    error["type"] = "Acumen Error";
    throw error;
}


export function splitError(err: Error) {
    return filterLines(err.stack.split("\n"))
}

export function stopProccessIfAcumenError(error: Error) {
    if (error["type"] === "Acumen Error") {
        delete error["type"]
        console.error(error);
        process.exit(1)
    }
}

/**
 * Provide any variable as argument. It will attempt to convert it to a
 * fully qualified Error instance
 * @param variable 
 */
export function ensureError(variable: any) {
    return variable instanceof Error ?
        variable :
        new Error(JSON.stringify(variable))
}


