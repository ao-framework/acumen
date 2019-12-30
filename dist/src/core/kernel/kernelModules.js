"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const coverageModule_1 = require("./modules/coverage/coverageModule");
const messageModule_1 = require("./modules/messageModule/messageModule");
const repoManager_1 = require("./modules/repoManager/repoManager");
const requestModule_1 = require("./modules/requests/requestModule");
class KernelModules {
    constructor(environment) {
        this.environment = environment;
        this.messages = new messageModule_1.MessageModule(this);
        this.repoManager = new repoManager_1.RepoManager(this);
        this.events = new events_1.EventEmitter();
        this.requests = new requestModule_1.RequestModule(this);
        this.coverage = new coverageModule_1.CoverageModule(this);
    }
}
exports.KernelModules = KernelModules;
//# sourceMappingURL=kernelModules.js.map