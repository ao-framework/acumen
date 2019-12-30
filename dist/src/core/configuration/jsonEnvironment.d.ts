import { iCoverageHandler } from "../../contracts/coverage/helpers/iCoverageHandler";
import { iSchemaHandler } from "../../contracts/schema/helpers/iSchemaHandler";
import { iSnapshotHandler } from "../../contracts/snapshots/helpers/iSnapshotHandler";
import { Environment } from "./base/environment";
export declare class JsonEnvironment extends Environment {
    /**
     * Function to call when schema information is provided
     */
    whenSchema: iSchemaHandler;
    /**
     * Function to call when snapshot information is provided
     */
    whenSnapshot: iSnapshotHandler;
    /**
     * Function to call when coverage information is provided
     */
    whenCoverage: iCoverageHandler;
}
