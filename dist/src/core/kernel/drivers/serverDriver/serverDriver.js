"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernelDriver_1 = require("../../kernelDriver");
const acumenServer_1 = require("./acumenServer");
class ServerDriver extends kernelDriver_1.KernelDriver {
    controller() {
        this.environment.serverEnvironments
            .forEach(environment => this.loadServerEnvironment(environment));
    }
    loadServerEnvironment(serverEnvironment) {
        const server = new acumenServer_1.AcumenServer(this.kernel, serverEnvironment);
        server.setupServer();
    }
}
exports.ServerDriver = ServerDriver;
//# sourceMappingURL=serverDriver.js.map