"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    /**
     * Get value from state
     * @param key
     */
    get(key) {
        if (this.has(key)) {
            return this[key];
        }
        throw new Error(`Trying read a Relay state value that does not exist (${key})`);
    }
    /**
     * Check to see if state has a key entry
     * @param key
     */
    has(key) {
        return this[key] !== undefined;
    }
    /**
     * Set value in state
     * @param key
     * @param value
     */
    set(key, value) {
        return this[key] = value;
    }
    /**
     * Remove value from state
     * @param key
     */
    remove(key) {
        if (this[key] !== undefined) {
            const value = this[key];
            delete this[key];
            return value;
        }
        return undefined;
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map