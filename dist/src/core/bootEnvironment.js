"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("./kernel/kernel");
function bootEnvironment(environment) {
    const kernel = new kernel_1.Kernel();
    kernel.loadEnvirnoment(environment);
    kernel.execute();
}
exports.bootEnvironment = bootEnvironment;
//# sourceMappingURL=bootEnvironment.js.map