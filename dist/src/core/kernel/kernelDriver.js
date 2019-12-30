"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KernelDriver {
    loadKernel(kernel) {
        this.kernel = kernel;
        return this;
    }
    loadEnvironment(environment) {
        this.environment = environment;
        return this;
    }
    controller() {
        throw new Error("Not implemented");
    }
    update() {
        throw new Error("Not implemented");
    }
}
exports.KernelDriver = KernelDriver;
//# sourceMappingURL=kernelDriver.js.map