import { unwatchFile, watch } from "fs";

import { debounce } from "./debounce";

/**
 * Provide a list paths you would like to watch and a handler that will fire
 * when a file in the list changes as arguments. It will wire everything up.
 * It will return a function that when called will remove all the of watches 
 * initialized. Every change notification will be delayed 500 milliseconds so
 * that high memory usage can be managed.
 * @param pathes 
 * @param handler 
 */
export function setUpWatch(paths: string[], handler: () => any) {
    const caller = debounce(null, handler, 500)
    paths.forEach(path => { watch(path, { recursive: true }, (...args) => caller(...args)); })
    return function stopWatch() { paths.forEach(path => unwatchFile(path)) }
}
