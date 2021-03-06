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
export function debounce<Context>(context: Context, handler: iFunction, delay: number): (...args: any[]) => any {
    let count: number = 0;
    return function () {
        count++;
        const myCount = count;
        setTimeout(() => myCount === count ? handler.apply(context, arguments) : null, delay)
    }
}
