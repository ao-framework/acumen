"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const environmentApi_1 = require("../base/api/environmentApi");
class JsonEnvironmentApi extends environmentApi_1.EnvironmentApi {
    /**
     * Provide the function you want to be called when new schema
     * information is available
     * @param handler
     */
    whenSchema(handler) {
        this.environment.whenSchema = coolKids_1.functionOrNothing(handler);
        return this;
    }
    /**
     * Provide the function you want to be called when new snapshot
     * information is available
     * @param handler
     */
    whenSnapshot(handler) {
        this.environment.whenSnapshot = coolKids_1.functionOrNothing(handler);
        return this;
    }
    /**
     * Provide the function you want to be called when new coverage
     * information is available
     * @param handler
     */
    whenCoverage(handler) {
        this.environment.whenCoverage = coolKids_1.functionOrNothing(handler);
        return this;
    }
}
exports.JsonEnvironmentApi = JsonEnvironmentApi;
//# sourceMappingURL=jsonEnvironmentApi.js.map