import { iDispatchRequestCoverage } from "../../../contracts/coverage/request/iDispatchRequestCoverage";
import { iDispatchResponseCoverage } from "../../../contracts/coverage/response/iDispatchResponseCoverage";
import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
export declare class Coverage implements iTransformer {
    private request;
    /**
     * Creates an instance of the Coverage Transformer from a DispatchRequest
     * @param request
     */
    constructor(request: iDispatchRequestCoverage);
    /**
     * Do the action of a transformer
     * @param suite
     * @param runtime
     */
    transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseCoverage>;
}
