"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logic = tslib_1.__importStar(require("./coverageLogic"));
const coverageLogic = tslib_1.__importStar(require("./coverageProfiler"));
class Coverage {
    /**
     * Creates an instance of the Coverage Transformer from a DispatchRequest
     * @param request
     */
    constructor(request) {
        this.request = request;
    }
    /**
     * Do the action of a transformer
     * @param suite
     * @param runtime
     */
    async transform(suite, runtime) {
        let tempSession;
        return Promise.resolve()
            .then(() => coverageLogic.startCoverage())
            .then((session) => tempSession = session)
            .then(() => runtime.leaseSuite(suite))
            .then(() => coverageLogic.endCoverage(tempSession))
            .then(profilerCoverage => logic.createCoverageReport(this.request, profilerCoverage))
            .then((rootDirectory) => {
            const response = {};
            response.url = "/coverage";
            response.headers = this.request.headers;
            response.body = { data: { directory: rootDirectory } };
            response.userAgent = "@transformer.coverage";
            return response;
        });
    }
}
exports.Coverage = Coverage;
//# sourceMappingURL=coverage.js.map