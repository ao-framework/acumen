"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is strictly null
 * @param obj
 */
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if is strictly undefined
 * @param obj
 */
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is either null or undefined
 * @param obj
 */
function isNill(variable) {
    return isNull(variable) || isUndefined(variable);
}
exports.isNill = isNill;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it is object like. Note that an array
 * is an object and will pass this test.
 * @param obj
 */
function isObjectLike(obj) {
    return typeof obj === "object" && obj !== null;
}
exports.isObjectLike = isObjectLike;
/**
 * Provide an variable as an argument. It will return a boolean
 * value to let you know if it an array or not.
 * @param obj
 */
function isArray(variable) {
    return Array.isArray(variable);
}
exports.isArray = isArray;
/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is an object or not.
 * It will only return true if the object is a "key value pair"
 * type of object.
 * @param obj
 */
function isObject(obj) {
    return !isArray(obj) && isObjectLike(obj);
}
exports.isObject = isObject;
/**
 * Provide a variable as an argument. It will return a
 * boolean value to let you know if it is a function
 * or not.
 * @param fn
 */
function isFunction(fn) {
    return typeof fn === "function";
}
exports.isFunction = isFunction;
/**
 * Provide a variable you suspect to be string as an argument. It will
 * return a boolean value indicating if it is a string or not.
 * @param variable
 */
function isString(variable) {
    return typeof variable === "string";
}
exports.isString = isString;
/**
 * Provide a variable you suspect to be a string as an argument. It wil
 * return a boolean value
 * @param str
 */
function stringHasLength(str) {
    return isString(str) && str.length > 0;
}
exports.stringHasLength = stringHasLength;
/**
 * Provide an object as an argument. It will return a boolean
 * value indicating if the object has properties or not.
 * @param obj
 */
function objectHasProperties(obj) {
    return Object.keys(obj).length > 0;
}
exports.objectHasProperties = objectHasProperties;
//# sourceMappingURL=validators.js.map