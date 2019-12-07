/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is strictly null
 * @param obj 
 */
export function isNull(obj: any) {
    return obj === null;
}

/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if is strictly undefined
 * @param obj 
 */
export function isUndefined(obj: any) {
    return obj === undefined;
}

/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is either null or undefined
 * @param obj 
 */
export function isNill(variable: any) {
    return isNull(variable) || isUndefined(variable)
}

/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is object like. Note that an array
 * is an object and will pass this test.
 * @param obj 
 */
export function isObjectLike(obj: object) {
    return typeof obj === "object" && obj !== null;
}

/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it an array or not.
 * @param obj 
 */
export function isArray(variable: any) {
    return Array.isArray(variable);
}

/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is an object or not.
 * It will only return true if the object is a "key value pair"
 * type of object.
 * @param obj 
 */
export function isObject(obj: object) {
    return !isArray(obj) && isObjectLike(obj)
}

/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is a function
 * or not.
 * @param fn 
 */
export function isFunction(fn: any) {
    return typeof fn === "function";
}

/**
 * Provide a variable you suspect to be string as an argument. It will
 * return a boolean value indicating if it is a string or not.
 * @param variable 
 */
export function isString(variable: any) {
    return typeof variable === "string";
}

/**
 * Provide a variable you suspect to be a string as an argument. It wil 
 * return a boolean value 
 * @param str 
 */
export function stringHasLength(str: string) {
    return isString(str) && str.length > 0;
}

/**
 * Provide an object as an argument. It will return a boolean
 * value indicating if the object has properties or not.
 * @param obj 
 */
export function objectHasProperties(obj: object) {
    return Object.keys(obj).length > 0;
}
