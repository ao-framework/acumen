/**
 * Provide a list paths you would like to watch and a handler that will fire
 * when a file in the list changes as arguments. It will wire everything up.
 * It will return a function that when called will remove all the of watches
 * initialized. Every change notification will be delayed 500 milliseconds so
 * that high memory usage can be managed.
 * @param pathes
 * @param handler
 */
export declare function setUpWatch(paths: string[], handler: () => any): () => void;
