import { iAcumenSuiteConstructor } from "../../../contracts/api/iAcumenSuiteConstructor";
import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
export declare class SuiteClassApi {
    /**
     * Provide a Acumen Suite Constructor as an argument. It will create the instance
     * and covert the constructor into a suite.
     * @param constructor
     */
    constructor(constructor: iAcumenSuiteConstructor);
    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    schema(): Promise<iSchemaResponseData>;
    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    snapshot(): Promise<iSnapshotResponseData>;
    /**
     * Provide coverage options as an argument. It will resolve the coverage for
     * this suite on its own with out the need of an external processor.
     * @param options
     */
    coverage(options: iCoverageOptions): Promise<iCoverageResponseData>;
    /**
     * Listen for external processor to execute this suite
     */
    listen(): void;
}
