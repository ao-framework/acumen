import { lookup } from "dns";
import { hostname } from "os";

import { whenNotObject } from "./coolKids";

/**
 * Provide the instance of an object as an argument. It will return all of the methods
 * on that instances prototype, excluding the constructor.
 * @param instance 
 */
export function getMethodNames(instance: object) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(name => name !== 'constructor' && typeof instance[name] === "function")
}

/**
 * Provide an instance of an object as context and an object of properties as arguments. The
 * properties will be assigned to the instance and returned.
 * @param instance 
 * @param obj 
 */
export function populateInstance<Context>(instance: Context, obj: object): Context {
    whenNotObject(obj, `Can not populate instance with anything over than an object`);
    for (let iterator in obj) { instance[iterator] = obj[iterator]; }
    return instance;
}


export function hostAddress(): Promise<string> {
    return new Promise((done, error) => {
        lookup(hostname(), (err, address) => {
            if (err) { error(err) }
            done(address)
        })
    })
}
