"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const variableDiagram_1 = require("../../../../commons/variableDiagram");
class Warning {
    constructor() {
        /**
         * The time that this warning was recorded
         */
        this.time = perf_hooks_1.performance.now();
    }
    /**
     * Factory method to create a warning
     * @param message
     * @param data
     */
    static make(message, data) {
        const warning = new Warning();
        warning.message = String(message);
        warning.data = variableDiagram_1.diagram(data);
        return warning;
    }
}
exports.Warning = Warning;
//# sourceMappingURL=warning.js.map