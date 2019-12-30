"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemaLogic_1 = require("./schemaLogic");
class Schema {
    /**
     * Creates the instance of the Schema transformer from a DispatchRequest
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
        return Promise.resolve(schemaLogic_1.toSchema(suite))
            .then(schema => {
            const response = {};
            response.url = "/schema";
            response.userAgent = "@transformer.schema";
            response.body = { data: schema };
            response.headers = this.request.headers;
            return response;
        });
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map