import { iCoverageHandler } from "../../contracts/coverage/helpers/iCoverageHandler";
import { iSchemaHandler } from "../../contracts/schema/helpers/iSchemaHandler";
import { iSnapshotHandler } from "../../contracts/snapshots/helpers/iSnapshotHandler";
import { Environment } from "./base/environment";

export class JsonEnvironment extends Environment {

    /**
     * Function to call when schema information is provided
     */
    public whenSchema: iSchemaHandler

    /**
     * Function to call when snapshot information is provided
     */
    public whenSnapshot: iSnapshotHandler;

    /**
     * Function to call when coverage information is provided
     */
    public whenCoverage: iCoverageHandler;

}
