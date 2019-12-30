"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const variableDiagram_1 = require("../../../../commons/variableDiagram");
class Spotlight {
    constructor() {
        /**
         * The time that the spotlight was captured
         */
        this.time = perf_hooks_1.performance.now();
    }
    /**
     * Factory method to create a spotlight
     * @param name
     * @param data
     */
    static make(name, data) {
        const spotlight = new Spotlight();
        spotlight.name = name;
        spotlight.data = variableDiagram_1.diagram(data);
        return spotlight;
    }
}
exports.Spotlight = Spotlight;
//# sourceMappingURL=spotlight.js.map