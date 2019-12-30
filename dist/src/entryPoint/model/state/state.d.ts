export declare class State {
    /**
     * Get value from state
     * @param key
     */
    get<Context>(key: string): Context;
    /**
     * Check to see if state has a key entry
     * @param key
     */
    has(key: string): boolean;
    /**
     * Set value in state
     * @param key
     * @param value
     */
    set(key: string, value: any): any;
    /**
     * Remove value from state
     * @param key
     */
    remove<Context>(key: string): Context;
}
