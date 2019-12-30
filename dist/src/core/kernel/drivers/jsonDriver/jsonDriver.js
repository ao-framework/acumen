"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../commons/validators");
const watchers_1 = require("../../../../commons/watchers");
const kernelDriver_1 = require("../../kernelDriver");
const jsonCoverage_1 = require("./jsonCoverage");
const jsonSchema_1 = require("./jsonSchema");
const jsonSnapshot_1 = require("./jsonSnapshot");
class JsonDriver extends kernelDriver_1.KernelDriver {
    controller() {
        this.environment.jsonEnvironments
            .forEach(environment => this.loadJsonEnvironment(environment));
    }
    loadJsonEnvironment(environment) {
        let jsonSchema;
        let jsonSnapshot;
        let jsonCoverage;
        if (validators_1.isFunction(environment.whenSchema)) {
            jsonSchema = new jsonSchema_1.JsonSchema(this.kernel, environment);
            jsonSchema.controller();
        }
        if (validators_1.isFunction(environment.whenSnapshot)) {
            jsonSnapshot = new jsonSnapshot_1.JsonSnapshot(this.kernel, environment);
            jsonSnapshot.controller();
        }
        if (validators_1.isFunction(environment.whenCoverage)) {
            jsonCoverage = new jsonCoverage_1.JsonCoverage(this.kernel, environment);
            jsonCoverage.controller();
        }
        watchers_1.setUpWatch(this.kernel.modules.repoManager.getWatches(environment.repo), () => {
            if (jsonSchema instanceof jsonSchema_1.JsonSchema) {
                jsonSchema.update();
            }
            if (jsonSchema instanceof jsonSchema_1.JsonSchema) {
                jsonSchema.update();
            }
            if (jsonSnapshot instanceof jsonSchema_1.JsonSchema) {
                jsonSnapshot.update();
            }
            if (jsonCoverage instanceof jsonSchema_1.JsonSchema) {
                jsonCoverage.update();
            }
        });
    }
}
exports.JsonDriver = JsonDriver;
//# sourceMappingURL=jsonDriver.js.map