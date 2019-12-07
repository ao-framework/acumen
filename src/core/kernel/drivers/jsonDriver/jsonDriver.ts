import { isFunction } from "../../../../commons/validators";
import { setUpWatch } from "../../../../commons/watchers";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { KernelDriver } from "../../kernelDriver";
import { JsonCoverage } from "./jsonCoverage";
import { JsonSchema } from "./jsonSchema";
import { JsonSnapshot } from "./jsonSnapshot";

export class JsonDriver extends KernelDriver {

    public controller() {
        this.environment.jsonEnvironments
            .forEach(environment => this.loadJsonEnvironment(environment))
    }

    public loadJsonEnvironment(environment: JsonEnvironment) {
        let jsonSchema: JsonSchema;
        let jsonSnapshot: JsonSnapshot;
        let jsonCoverage: JsonCoverage;
        if (isFunction(environment.whenSchema)) {
            jsonSchema = new JsonSchema(this.kernel, environment);
            jsonSchema.controller();
        }
        if (isFunction(environment.whenSnapshot)) {
            jsonSnapshot = new JsonSnapshot(this.kernel, environment);
            jsonSnapshot.controller();
        }
        if (isFunction(environment.whenCoverage)) {
            jsonCoverage = new JsonCoverage(this.kernel, environment);
            jsonCoverage.controller();
        }
        setUpWatch(this.kernel.modules.repoManager.getWatches(environment.repo), () => {
            if (jsonSchema instanceof JsonSchema) { jsonSchema.update() }
            if (jsonSchema instanceof JsonSchema) { jsonSchema.update() }
            if (jsonSnapshot instanceof JsonSchema) { jsonSnapshot.update() }
            if (jsonCoverage instanceof JsonSchema) { jsonCoverage.update() }
        })
    }
}
