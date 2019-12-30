"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const watchers_1 = require("../../../../commons/watchers");
const kernelDriver_1 = require("../../kernelDriver");
const terminalCoverage_1 = require("./terminalCoverage");
const terminalSchema_1 = require("./terminalSchema");
const terminalSnapshot_1 = require("./terminalSnapshot");
class TerminalDriver extends kernelDriver_1.KernelDriver {
    controller() {
        this.environment.terminalEnvironments
            .forEach(environment => this.loadTerminalEnvironment(environment));
    }
    loadTerminalEnvironment(terminal) {
        let snapshot;
        let schema;
        let coverage;
        if (terminal.transformers.includes("schema")) {
            schema = new terminalSchema_1.TerminalSchema(this.kernel, terminal);
            schema.controller();
        }
        if (terminal.transformers.includes("snapshot")) {
            snapshot = new terminalSnapshot_1.TerminalSnapshot(this.kernel, terminal);
            snapshot.controller();
        }
        if (terminal.transformers.includes("coverage")) {
            coverage = new terminalCoverage_1.TerminalCoverage(this.kernel, terminal);
            coverage.controller();
        }
        watchers_1.setUpWatch(terminal.repo.watches, () => {
            if (schema instanceof terminalSchema_1.TerminalSchema) {
                schema.update();
            }
            if (snapshot instanceof terminalSnapshot_1.TerminalSnapshot) {
                snapshot.update();
            }
            if (coverage instanceof terminalCoverage_1.TerminalCoverage) {
                coverage.update();
            }
        });
    }
}
exports.TerminalDriver = TerminalDriver;
//# sourceMappingURL=terminalDriver.js.map