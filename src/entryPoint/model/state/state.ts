export class State {

    /**
     * Get value from state
     * @param key 
     */
    public get<Context>(key: string): Context {
        if (this.has(key)) {
            return this[key];
        }
        throw new Error(`Trying read a Relay state value that does not exist (${key})`)
    }

    /**
     * Check to see if state has a key entry
     * @param key 
     */
    public has(key: string) {
        return this[key] !== undefined;
    }


    /**
     * Set value in state
     * @param key 
     * @param value 
     */
    public set(key: string, value: any) {
        return this[key] = value;
    }

    /**
     * Remove value from state
     * @param key 
     */
    public remove<Context>(key: string) {
        if (this[key] !== undefined) {
            const value: Context = this[key];
            delete this[key];
            return value;
        }
        return undefined;
    }
}

