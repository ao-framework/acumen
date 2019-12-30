import { iCoverageHandler } from "../../../contracts/coverage/helpers/iCoverageHandler";
import { iSchemaHandler } from "../../../contracts/schema/helpers/iSchemaHandler";
import { iSnapshotHandler } from "../../../contracts/snapshots/helpers/iSnapshotHandler";
import { EnvironmentApi } from "../base/api/environmentApi";
import { JsonEnvironment } from "../jsonEnvironment";
export declare class JsonEnvironmentApi extends EnvironmentApi<JsonEnvironment> {
    /**
     * Provide the function you want to be called when new schema
     * information is available
     * @param handler
     */
    whenSchema(handler: iSchemaHandler): this;
    /**
     * Provide the function you want to be called when new snapshot
     * information is available
     * @param handler
     */
    whenSnapshot(handler: iSnapshotHandler): this;
    /**
     * Provide the function you want to be called when new coverage
     * information is available
     * @param handler
     */
    whenCoverage(handler: iCoverageHandler): this;
}
