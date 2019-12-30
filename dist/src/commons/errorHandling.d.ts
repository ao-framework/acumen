/**
 * Provide the error message and a global namespace as arguments. It will throw
 * an exception at the factory level for easy changes at a later date.
 * @param message
 * @param namespace
 */
export declare function throwExpection(message: string, namespace?: string): void;
export declare function splitError(err: Error): string[];
export declare function stopProccessIfAcumenError(error: Error): void;
/**
 * Provide any variable as argument. It will attempt to convert it to a
 * fully qualified Error instance
 * @param variable
 */
export declare function ensureError(variable: any): Error;
