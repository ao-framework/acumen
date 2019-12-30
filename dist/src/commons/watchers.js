"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const debounce_1 = require("./debounce");
/**
 * Provide a list paths you would like to watch and a handler that will fire
 * when a file in the list changes as arguments. It will wire everything up.
 * It will return a function that when called will remove all the of watches
 * initialized. Every change notification will be delayed 500 milliseconds so
 * that high memory usage can be managed.
 * @param pathes
 * @param handler
 */
function setUpWatch(paths, handler) {
    const caller = debounce_1.debounce(null, handler, 500);
    paths.forEach(path => { fs_1.watch(path, { recursive: true }, (...args) => caller(...args)); });
    return function stopWatch() { paths.forEach(path => fs_1.unwatchFile(path)); };
}
exports.setUpWatch = setUpWatch;
//# sourceMappingURL=watchers.js.map