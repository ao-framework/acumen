import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { iDispatchRequestSchema } from "../../../contracts/schema/request/iDispatchRequestSchema";
import { iDispatchResponseSchema } from "../../../contracts/schema/response/iDispatchResponseSchema";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
export declare class Schema implements iTransformer {
    private request;
    /**
     * Creates the instance of the Schema transformer from a DispatchRequest
     * @param request
     */
    constructor(request: iDispatchRequestSchema);
    /**
     * Do the action of a transformer
     * @param suite
     * @param runtime
     */
    transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseSchema>;
}
