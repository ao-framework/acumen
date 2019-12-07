import { iAcumenSuiteConstructor } from "../../../contracts/api/iAcumenSuiteConstructor";
import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchResponseCoverage } from "../../../contracts/coverage/response/iDispatchResponseCoverage";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iDispatchResponseSchema } from "../../../contracts/schema/response/iDispatchResponseSchema";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { iDispatchResponseSnapshot } from "../../../contracts/snapshots/response/iDispatchResponseSnapshot";
import { Dispatch } from "../../dispatch/dispatch";
import { Suite } from "../../model/suite/suite";
import * as logic from "./suiteClassApiLogic";

const suites = new WeakMap<SuiteClassApi, Suite>();

export class SuiteClassApi {

    /**
     * Provide a Acumen Suite Constructor as an argument. It will create the instance
     * and covert the constructor into a suite.
     * @param constructor 
     */
    public constructor(constructor: iAcumenSuiteConstructor) {
        const suite = logic.makeSuite(constructor);
        suites.set(this, suite);
    }

    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    public async schema(): Promise<iSchemaResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/schema", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseSchema) => response.body.data)
    }

    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    public async snapshot(): Promise<iSnapshotResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/snapshot", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseSnapshot) => response.body.data);
    }

    /**
     * Provide coverage options as an argument. It will resolve the coverage for 
     * this suite on its own with out the need of an external processor.
     * @param options 
     */
    public async coverage(options: iCoverageOptions): Promise<iCoverageResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/coverage", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseCoverage) => response.body.data)
    }

    /**
     * Listen for external processor to execute this suite
     */
    public listen() {
        const suite = suites.get(this)
        const dispatch = new Dispatch(suite);
        dispatch.listen();
    }
}
