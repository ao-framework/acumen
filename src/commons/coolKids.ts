import { iFunction } from "../contracts/base/iFunction";
import { throwExpection } from "./errorHandling";
import { isArray, isFunction, isObject } from "./validators";

/**
 * Provide an object you are unsure is an object and an object
 * that would be a suitable replacement and contains default options 
 * as arguments. it will return either the default options if unsure 
 * version doesn't meet muster. All default options will be applied even 
 * if the unsure version meets muster.
 * @param obj 
 * @param defaultObject 
 */
export function ensureObject<Context extends object>(
    obj: Context,
    defaultObject: Context = {} as Context
): Context {
    if (isObject(obj)) { return Object.assign(defaultObject, obj); }
    return defaultObject;
}

/**
 * Provide an array you are unsure is an array and an array
 * that would be a suitable replacement and contains default options 
 * as arguments. it will return either the default options if unsure 
 * version doesn't meet muster. All default options will be applied even 
 * if the unsure version meets muster.
 * @param arr 
 * @param defaultArray 
 */
export function ensureArray<Context extends any[]>(
    arr: Context,
    defaultArray: Context = [] as Context
): Context {
    if (isArray(arr)) { return Object.assign(defaultArray, arr) }
    return defaultArray;
}

/**
 * Provide a function you are unsure about as an argument. it will
 * return a new function that will propagate to the function provided only
 * when it was a really a function.
 * @param fn 
 */
export function whenFunction(fn: Function) {
    return function (...args: any) {
        if (isFunction(fn)) {
            fn(...args);
        }
    }
}

/**
 * Provide a boolean value condition as an argument. It will return 
 * a function that takes a callback that will be called only when the 
 * original condition is met.
 * @param condition 
 */
export function whenTrue(condition: boolean) {
    return (handler: Function) => {
        if (condition) {
            handler()
        }
    }
}

/**
 * Provide a variable and an error message as an argument. If the variable
 * is not a string, it will throw an error with the provided message. If the 
 * variable is a string, it will be returned
 * @param str 
 * @param message 
 */
export function whenNotString(variable: any, message: string) {
    if (typeof variable !== "string") {
        throwExpection(message)
    }
    return variable;
}

/**
 * Provide a string and an error message as an argument. If the string
 * length is equal to zero, it will throw an error with the provided message. 
 * If the length is greater, the string will be returned
 * @param str 
 * @param message 
 */
export function whenStringVoidOfCharacters(str: string, message: string) {
    if (str.length === 0) {
        throwExpection(message);
    }
    return str;
}

/**
 * Provide a variable as an argument. If the variable is a string, it will
 * return it. If the variable it not string, it will return void as to give
 * undefined to prevent weird side effects.
 * @param str 
 */
export function stringOrNothing(variable: any) {
    if (typeof variable === "string") {
        return variable;
    }
    return void 0;
}

/**
 * Provide a variable as an argument. If the variable is a function, it will
 * return it. If the variable it not a function, it will return void as to give
 * undefined to prevent weird side effects.
 * @param fn 
 */
export function functionOrNothing<Context extends Function>(fn: Context): Context {
    if (typeof fn === "function") {
        return fn;
    }
    return void 0;
}

/**
 * Provide a variable you are not sure is a function and an error message as arguments. If the
 * variable is not a function, it will throw the message provided.
 * @param fn 
 * @param message 
 */
export function whenNotFunction(fn: Function, message: string) {
    if (typeof fn !== "function") {
        throwExpection(message);
    }
}

/**
 * Provide a variable you believe to be a number and a default number as arguments.
 * If the variable is a number, it will be returned. If the variable is not a number,
 * the default number will be returned
 * @param n 
 * @param defaultInteger 
 */
export function numberOrDefault(n: number, defaultInteger: number) {
    if (typeof n === "number") {
        return n;
    }
    return defaultInteger;
}

/**
 * Provide a variable that you suppose is an object and an error message. It will
 * check if the variable is an object. If it fails the test, it will throw the message
 * provided using internal error handling.
 * @param variable 
 * @param message 
 */
export function whenNotObject(variable: any, message: string) {
    if (!isObject(variable)) {
        throwExpection(message);
    }
}

/**
 * Provide the possible error from a node js callback, the reject function of a promise, and a
 * callback to fire when an error is not present as arguments. It will orchestrate the promise
 * transaction with more grace.
 * @param err 
 * @param reject 
 * @param ifNot 
 */
export function rejectIf(err: Error, reject: iFunction, ifNot: iFunction) {
    if (err) { reject(err); return; }
    whenNotFunction(ifNot, `Promise was not reject and no alternative was supplied`);
    ifNot();
}

/**
 * Provide an object and callback as arguments. It will iterate over the object passing each value
 * as the argument of the callback and the iterator as the second. All of the return values will be
 * collected into a list and returned.
 * @param obj 
 * @param handler 
 */
export function eachValue<Context>(obj: object, handler: (value: any, key: string) => Context): Context[] {
    const map: Context[] = []
    for (let iterator in obj) {
        map.push(handler(obj[iterator], iterator));
    }
    return map;
}


export function match() {
    type Action = [boolean, iFunction];
    const actions: Action[] = [];
    const latch = {
        when(condition: boolean, action: iFunction) {
            actions.push([condition, action])
            return latch;
        },
        default(defaultHandler: iFunction) {
            for (let item of actions) {
                if (item[0]) {
                    return item[1]()
                }
            }
            whenFunction(defaultHandler)()
        }
    }
    return latch;
}

export function matchAll() {
    type Action = [boolean, iFunction];
    const actions: Action[] = [];
    const latch = {
        when(condition: boolean, action: iFunction) {
            actions.push([condition, action])
            return latch;
        },
        default(defaultHandler: iFunction) {
            let called = false;
            for (let item of actions) {
                if (item[0]) {
                    item[1]()
                    called = true;
                }
            }
            if (called === false) {
                whenFunction(defaultHandler)();
            }
        }
    }
    return latch;
}
