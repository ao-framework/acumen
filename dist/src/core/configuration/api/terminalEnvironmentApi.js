"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environmentApi_1 = require("../base/api/environmentApi");
class TerminalEnvironmentApi extends environmentApi_1.EnvironmentApi {
    snapshot() {
        this.environment.transformers.push("snapshot");
        return this;
    }
    schema() {
        this.environment.transformers.push("schema");
        return this;
    }
    coverage(options) {
        this.environment.transformers.push("coverage");
        this.environment.repo.coverageOptions = options;
        return this;
    }
}
exports.TerminalEnvironmentApi = TerminalEnvironmentApi;
//# sourceMappingURL=terminalEnvironmentApi.js.map