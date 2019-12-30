import { iFunction } from "../contracts/base/iFunction";
/**
 * Provide an object you are unsure is an object and an object
 * that would be a suitable replacement and contains default options
 * as arguments. it will return either the default options if unsure
 * version doesn't meet muster. All default options will be applied even
 * if the unsure version meets muster.
 * @param obj
 * @param defaultObject
 */
export declare function ensureObject<Context extends object>(obj: Context, defaultObject?: Context): Context;
/**
 * Provide an array you are unsure is an array and an array
 * that would be a suitable replacement and contains default options
 * as arguments. it will return either the default options if unsure
 * version doesn't meet muster. All default options will be applied even
 * if the unsure version meets muster.
 * @param arr
 * @param defaultArray
 */
export declare function ensureArray<Context extends any[]>(arr: Context, defaultArray?: Context): Context;
/**
 * Provide a function you are unsure about as an argument. it will
 * return a new function that will propagate to the function provided only
 * when it was a really a function.
 * @param fn
 */
export declare function whenFunction(fn: Function): (...args: any) => void;
/**
 * Provide a boolean value condition as an argument. It will return
 * a function that takes a callback that will be called only when the
 * original condition is met.
 * @param condition
 */
export declare function whenTrue(condition: boolean): (handler: Function) => void;
/**
 * Provide a variable and an error message as an argument. If the variable
 * is not a string, it will throw an error with the provided message. If the
 * variable is a string, it will be returned
 * @param str
 * @param message
 */
export declare function whenNotString(variable: any, message: string): any;
/**
 * Provide a string and an error message as an argument. If the string
 * length is equal to zero, it will throw an error with the provided message.
 * If the length is greater, the string will be returned
 * @param str
 * @param message
 */
export declare function whenStringVoidOfCharacters(str: string, message: string): string;
/**
 * Provide a variable as an argument. If the variable is a string, it will
 * return it. If the variable it not string, it will return void as to give
 * undefined to prevent weird side effects.
 * @param str
 */
export declare function stringOrNothing(variable: any): string;
/**
 * Provide a variable as an argument. If the variable is a function, it will
 * return it. If the variable it not a function, it will return void as to give
 * undefined to prevent weird side effects.
 * @param fn
 */
export declare function functionOrNothing<Context extends Function>(fn: Context): Context;
/**
 * Provide a variable you are not sure is a function and an error message as arguments. If the
 * variable is not a function, it will throw the message provided.
 * @param fn
 * @param message
 */
export declare function whenNotFunction(fn: Function, message: string): void;
/**
 * Provide a variable you believe to be a number and a default number as arguments.
 * If the variable is a number, it will be returned. If the variable is not a number,
 * the default number will be returned
 * @param n
 * @param defaultInteger
 */
export declare function numberOrDefault(n: number, defaultInteger: number): number;
/**
 * Provide a variable that you suppose is an object and an error message. It will
 * check if the variable is an object. If it fails the test, it will throw the message
 * provided using internal error handling.
 * @param variable
 * @param message
 */
export declare function whenNotObject(variable: any, message: string): void;
/**
 * Provide the possible error from a node js callback, the reject function of a promise, and a
 * callback to fire when an error is not present as arguments. It will orchestrate the promise
 * transaction with more grace.
 * @param err
 * @param reject
 * @param ifNot
 */
export declare function rejectIf(err: Error, reject: iFunction, ifNot: iFunction): void;
/**
 * Provide an object and callback as arguments. It will iterate over the object passing each value
 * as the argument of the callback and the iterator as the second. All of the return values will be
 * collected into a list and returned.
 * @param obj
 * @param handler
 */
export declare function eachValue<Context>(obj: object, handler: (value: any, key: string) => Context): Context[];
export declare function match(): {
    when(condition: boolean, action: iFunction): any;
    default(defaultHandler: iFunction): any;
};
export declare function matchAll(): {
    when(condition: boolean, action: iFunction): any;
    default(defaultHandler: iFunction): void;
};
