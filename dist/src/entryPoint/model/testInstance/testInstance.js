"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const perf_hooks_1 = require("perf_hooks");
const testInstanceLogic = tslib_1.__importStar(require("./testInstanceLogic"));
class TestInstance {
    constructor() {
        /**
         * The spotlight items created while this instance ran
         */
        this.spotlights = [];
        /**
         * The warning items create while this instance ran
         */
        this.warnings = [];
        /**
         * The arguments passed to this instance
         */
        this.args = [];
        /**
         * The name of every level up till this point
         */
        this.breadCrumbs = [];
        /**
         * Holds the log entries from the runtime
         */
        this.log = [];
    }
    /**
     * Helper method to end the benchmark and set the time
     */
    endBenchmark() {
        this.end = perf_hooks_1.performance.now();
        this.time = this.end - this.start;
    }
}
exports.TestInstance = TestInstance;
/**
 * Static logic that pertains to the concept of the test instance
 */
TestInstance.logic = testInstanceLogic;
//# sourceMappingURL=testInstance.js.map