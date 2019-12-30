/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is strictly null
 * @param obj
 */
export declare function isNull(obj: any): boolean;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if is strictly undefined
 * @param obj
 */
export declare function isUndefined(obj: any): boolean;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is either null or undefined
 * @param obj
 */
export declare function isNill(variable: any): boolean;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is object like. Note that an array
 * is an object and will pass this test.
 * @param obj
 */
export declare function isObjectLike(obj: object): boolean;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it an array or not.
 * @param obj
 */
export declare function isArray(variable: any): boolean;
/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is an object or not.
 * It will only return true if the object is a "key value pair"
 * type of object.
 * @param obj
 */
export declare function isObject(obj: object): boolean;
/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is a function
 * or not.
 * @param fn
 */
export declare function isFunction(fn: any): boolean;
/**
 * Provide a variable you suspect to be string as an argument. It will
 * return a boolean value indicating if it is a string or not.
 * @param variable
 */
export declare function isString(variable: any): boolean;
/**
 * Provide a variable you suspect to be a string as an argument. It wil
 * return a boolean value
 * @param str
 */
export declare function stringHasLength(str: string): boolean;
/**
 * Provide an object as an argument. It will return a boolean
 * value indicating if the object has properties or not.
 * @param obj
 */
export declare function objectHasProperties(obj: object): boolean;
