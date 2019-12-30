"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleEnvironmentApi_1 = require("./api/consoleEnvironmentApi");
const repoEnvironmentApi_1 = require("./api/repoEnvironmentApi");
class EnvironmentApi {
    constructor(environment) {
        this.environment = environment;
        this.console = new consoleEnvironmentApi_1.ConsoleEnvironmentApi(this.environment.console);
        this.repo = new repoEnvironmentApi_1.RepoEnvironmentApi(this.environment.repo);
    }
}
exports.EnvironmentApi = EnvironmentApi;
//# sourceMappingURL=environmentApi.js.map