"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dispatch_1 = require("../../dispatch/dispatch");
const logic = tslib_1.__importStar(require("./suiteClassApiLogic"));
const suites = new WeakMap();
class SuiteClassApi {
    /**
     * Provide a Acumen Suite Constructor as an argument. It will create the instance
     * and covert the constructor into a suite.
     * @param constructor
     */
    constructor(constructor) {
        const suite = logic.makeSuite(constructor);
        suites.set(this, suite);
    }
    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    async schema() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/schema", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    async snapshot() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/snapshot", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * Provide coverage options as an argument. It will resolve the coverage for
     * this suite on its own with out the need of an external processor.
     * @param options
     */
    async coverage(options) {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/coverage", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * Listen for external processor to execute this suite
     */
    listen() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        dispatch.listen();
    }
}
exports.SuiteClassApi = SuiteClassApi;
//# sourceMappingURL=suiteClassApi.js.map