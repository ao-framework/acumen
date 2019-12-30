"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../../commons/errorHandling");
const filters_1 = require("../../../core/processor/filters");
const testInstance_1 = require("./testInstance");
/**
 * The failure instance is type of test instance
 */
class FailureInstance extends testInstance_1.TestInstance {
    constructor() {
        super(...arguments);
        /**
         * Set the type to failure
         */
        this.type = "failure";
        /**
         * The error stack trace as an array for easy transport
         */
        this.error = [];
    }
    /**
     * Helper method to set the error property member
     * @param error
     */
    setError(error) {
        this.error = filters_1.filterLines(errorHandling_1.splitError(errorHandling_1.ensureError(error)));
    }
}
exports.FailureInstance = FailureInstance;
//# sourceMappingURL=failureInstance.js.map