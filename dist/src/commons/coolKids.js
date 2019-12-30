"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("./errorHandling");
const validators_1 = require("./validators");
/**
 * Provide an object you are unsure is an object and an object
 * that would be a suitable replacement and contains default options
 * as arguments. it will return either the default options if unsure
 * version doesn't meet muster. All default options will be applied even
 * if the unsure version meets muster.
 * @param obj
 * @param defaultObject
 */
function ensureObject(obj, defaultObject = {}) {
    if (validators_1.isObject(obj)) {
        return Object.assign(defaultObject, obj);
    }
    return defaultObject;
}
exports.ensureObject = ensureObject;
/**
 * Provide an array you are unsure is an array and an array
 * that would be a suitable replacement and contains default options
 * as arguments. it will return either the default options if unsure
 * version doesn't meet muster. All default options will be applied even
 * if the unsure version meets muster.
 * @param arr
 * @param defaultArray
 */
function ensureArray(arr, defaultArray = []) {
    if (validators_1.isArray(arr)) {
        return Object.assign(defaultArray, arr);
    }
    return defaultArray;
}
exports.ensureArray = ensureArray;
/**
 * Provide a function you are unsure about as an argument. it will
 * return a new function that will propagate to the function provided only
 * when it was a really a function.
 * @param fn
 */
function whenFunction(fn) {
    return function (...args) {
        if (validators_1.isFunction(fn)) {
            fn(...args);
        }
    };
}
exports.whenFunction = whenFunction;
/**
 * Provide a boolean value condition as an argument. It will return
 * a function that takes a callback that will be called only when the
 * original condition is met.
 * @param condition
 */
function whenTrue(condition) {
    return (handler) => {
        if (condition) {
            handler();
        }
    };
}
exports.whenTrue = whenTrue;
/**
 * Provide a variable and an error message as an argument. If the variable
 * is not a string, it will throw an error with the provided message. If the
 * variable is a string, it will be returned
 * @param str
 * @param message
 */
function whenNotString(variable, message) {
    if (typeof variable !== "string") {
        errorHandling_1.throwExpection(message);
    }
    return variable;
}
exports.whenNotString = whenNotString;
/**
 * Provide a string and an error message as an argument. If the string
 * length is equal to zero, it will throw an error with the provided message.
 * If the length is greater, the string will be returned
 * @param str
 * @param message
 */
function whenStringVoidOfCharacters(str, message) {
    if (str.length === 0) {
        errorHandling_1.throwExpection(message);
    }
    return str;
}
exports.whenStringVoidOfCharacters = whenStringVoidOfCharacters;
/**
 * Provide a variable as an argument. If the variable is a string, it will
 * return it. If the variable it not string, it will return void as to give
 * undefined to prevent weird side effects.
 * @param str
 */
function stringOrNothing(variable) {
    if (typeof variable === "string") {
        return variable;
    }
    return void 0;
}
exports.stringOrNothing = stringOrNothing;
/**
 * Provide a variable as an argument. If the variable is a function, it will
 * return it. If the variable it not a function, it will return void as to give
 * undefined to prevent weird side effects.
 * @param fn
 */
function functionOrNothing(fn) {
    if (typeof fn === "function") {
        return fn;
    }
    return void 0;
}
exports.functionOrNothing = functionOrNothing;
/**
 * Provide a variable you are not sure is a function and an error message as arguments. If the
 * variable is not a function, it will throw the message provided.
 * @param fn
 * @param message
 */
function whenNotFunction(fn, message) {
    if (typeof fn !== "function") {
        errorHandling_1.throwExpection(message);
    }
}
exports.whenNotFunction = whenNotFunction;
/**
 * Provide a variable you believe to be a number and a default number as arguments.
 * If the variable is a number, it will be returned. If the variable is not a number,
 * the default number will be returned
 * @param n
 * @param defaultInteger
 */
function numberOrDefault(n, defaultInteger) {
    if (typeof n === "number") {
        return n;
    }
    return defaultInteger;
}
exports.numberOrDefault = numberOrDefault;
/**
 * Provide a variable that you suppose is an object and an error message. It will
 * check if the variable is an object. If it fails the test, it will throw the message
 * provided using internal error handling.
 * @param variable
 * @param message
 */
function whenNotObject(variable, message) {
    if (!validators_1.isObject(variable)) {
        errorHandling_1.throwExpection(message);
    }
}
exports.whenNotObject = whenNotObject;
/**
 * Provide the possible error from a node js callback, the reject function of a promise, and a
 * callback to fire when an error is not present as arguments. It will orchestrate the promise
 * transaction with more grace.
 * @param err
 * @param reject
 * @param ifNot
 */
function rejectIf(err, reject, ifNot) {
    if (err) {
        reject(err);
        return;
    }
    whenNotFunction(ifNot, `Promise was not reject and no alternative was supplied`);
    ifNot();
}
exports.rejectIf = rejectIf;
/**
 * Provide an object and callback as arguments. It will iterate over the object passing each value
 * as the argument of the callback and the iterator as the second. All of the return values will be
 * collected into a list and returned.
 * @param obj
 * @param handler
 */
function eachValue(obj, handler) {
    const map = [];
    for (let iterator in obj) {
        map.push(handler(obj[iterator], iterator));
    }
    return map;
}
exports.eachValue = eachValue;
function match() {
    const actions = [];
    const latch = {
        when(condition, action) {
            actions.push([condition, action]);
            return latch;
        },
        default(defaultHandler) {
            for (let item of actions) {
                if (item[0]) {
                    return item[1]();
                }
            }
            whenFunction(defaultHandler)();
        }
    };
    return latch;
}
exports.match = match;
function matchAll() {
    const actions = [];
    const latch = {
        when(condition, action) {
            actions.push([condition, action]);
            return latch;
        },
        default(defaultHandler) {
            let called = false;
            for (let item of actions) {
                if (item[0]) {
                    item[1]();
                    called = true;
                }
            }
            if (called === false) {
                whenFunction(defaultHandler)();
            }
        }
    };
    return latch;
}
exports.matchAll = matchAll;
//# sourceMappingURL=coolKids.js.map