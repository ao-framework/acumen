"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environmentApi_1 = require("../base/api/environmentApi");
class ServerEnvironmentApi extends environmentApi_1.EnvironmentApi {
    port(port) {
        this.environment.port = port;
        return this;
    }
    allowOverNetwork(use) {
        this.environment.allowOverNetwork = use;
        return this;
    }
    useBrowserConsole() {
        this.environment.useBrowserConsole = true;
        return this;
    }
}
exports.ServerEnvironmentApi = ServerEnvironmentApi;
//# sourceMappingURL=serverEnvironmentApi.js.map