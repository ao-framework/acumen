"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = require("dns");
const os_1 = require("os");
const coolKids_1 = require("./coolKids");
/**
 * Provide the instance of an object as an argument. It will return all of the methods
 * on that instances prototype, excluding the constructor.
 * @param instance
 */
function getMethodNames(instance) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(name => name !== 'constructor' && typeof instance[name] === "function");
}
exports.getMethodNames = getMethodNames;
/**
 * Provide an instance of an object as context and an object of properties as arguments. The
 * properties will be assigned to the instance and returned.
 * @param instance
 * @param obj
 */
function populateInstance(instance, obj) {
    coolKids_1.whenNotObject(obj, `Can not populate instance with anything over than an object`);
    for (let iterator in obj) {
        instance[iterator] = obj[iterator];
    }
    return instance;
}
exports.populateInstance = populateInstance;
function hostAddress() {
    return new Promise((done, error) => {
        dns_1.lookup(os_1.hostname(), (err, address) => {
            if (err) {
                error(err);
            }
            done(address);
        });
    });
}
exports.hostAddress = hostAddress;
//# sourceMappingURL=helpers.js.map