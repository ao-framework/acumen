
import { functionOrNothing } from "../../../commons/coolKids";
import { iCoverageHandler } from "../../../contracts/coverage/helpers/iCoverageHandler";
import { iSchemaHandler } from "../../../contracts/schema/helpers/iSchemaHandler";
import { iSnapshotHandler } from "../../../contracts/snapshots/helpers/iSnapshotHandler";
import { EnvironmentApi } from "../base/api/environmentApi";
import { JsonEnvironment } from "../jsonEnvironment";

export class JsonEnvironmentApi extends EnvironmentApi<JsonEnvironment>{

    /**
     * Provide the function you want to be called when new schema
     * information is available
     * @param handler 
     */
    public whenSchema(handler: iSchemaHandler) {
        this.environment.whenSchema = functionOrNothing(handler);
        return this;
    }

    /**
     * Provide the function you want to be called when new snapshot
     * information is available
     * @param handler 
     */
    public whenSnapshot(handler: iSnapshotHandler) {
        this.environment.whenSnapshot = functionOrNothing(handler)
        return this;
    }

    /**
     * Provide the function you want to be called when new coverage
     * information is available
     * @param handler 
     */
    public whenCoverage(handler: iCoverageHandler) {
        this.environment.whenCoverage = functionOrNothing(handler)
        return this;
    }

}
