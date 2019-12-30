"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonDriver_1 = require("./drivers/jsonDriver/jsonDriver");
const markdownDriver_1 = require("./drivers/markdownDriver/markdownDriver");
const serverDriver_1 = require("./drivers/serverDriver/serverDriver");
const terminalDriver_1 = require("./drivers/terminalDriver/terminalDriver");
const kernelModules_1 = require("./kernelModules");
class Kernel {
    constructor() {
        this.json = new jsonDriver_1.JsonDriver();
        this.server = new serverDriver_1.ServerDriver();
        this.terminal = new terminalDriver_1.TerminalDriver();
        this.markdownDriver = new markdownDriver_1.MarkdownDriver();
        this.json.loadKernel(this);
        this.server.loadKernel(this);
        this.terminal.loadKernel(this);
        this.markdownDriver.loadKernel(this);
    }
    loadEnvirnoment(environment) {
        this.environment = environment;
        this.modules = new kernelModules_1.KernelModules(environment);
        this.json.loadEnvironment(environment);
        this.server.loadEnvironment(environment);
        this.terminal.loadEnvironment(environment);
        this.markdownDriver.loadEnvironment(environment);
    }
    execute() {
        this.json.controller();
        this.server.controller();
        this.terminal.controller();
        this.markdownDriver.controller();
    }
}
exports.Kernel = Kernel;
//# sourceMappingURL=kernel.js.map