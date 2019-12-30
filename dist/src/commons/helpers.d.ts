/**
 * Provide the instance of an object as an argument. It will return all of the methods
 * on that instances prototype, excluding the constructor.
 * @param instance
 */
export declare function getMethodNames(instance: object): string[];
/**
 * Provide an instance of an object as context and an object of properties as arguments. The
 * properties will be assigned to the instance and returned.
 * @param instance
 * @param obj
 */
export declare function populateInstance<Context>(instance: Context, obj: object): Context;
export declare function hostAddress(): Promise<string>;
