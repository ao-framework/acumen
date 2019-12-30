"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snapshotLogic_1 = require("./snapshotLogic");
class Snapshot {
    /**
     * Creates an instance of the Snapshot Transformer from a DispatchRequest
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
        return Promise.resolve()
            .then(() => runtime.leaseSuite(suite))
            .then(suite => snapshotLogic_1.createSnapshot(suite))
            .then(snapshotResponse => {
            const response = {};
            response.url = "/snapshot";
            response.userAgent = "@transformer.snapshot";
            response.headers = this.request.headers;
            response.body = { data: snapshotResponse };
            return response;
        });
    }
}
exports.Snapshot = Snapshot;
//# sourceMappingURL=snapshot.js.map