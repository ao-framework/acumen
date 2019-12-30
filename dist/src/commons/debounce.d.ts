import { iFunction } from "../contracts/base/iFunction";
/**
 * Provide an object that you would like to use as context, the function you wish to call, and
 * the number milliseconds to delay as arguments. It will return a function that you can call
 * as many times and as quickly as you wish without fear of it being called more times than
 * what the delay will allow for.
 * @param context
 * @param handler
 * @param delay
 */
export declare function debounce<Context>(context: Context, handler: iFunction, delay: number): (...args: any[]) => any;
