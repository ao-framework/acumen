import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { iDispatchRequestSnapshot } from "../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { iDispatchResponseSnapshot } from "../../../contracts/snapshots/response/iDispatchResponseSnapshot";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
export declare class Snapshot implements iTransformer {
    private request;
    /**
     * Creates an instance of the Snapshot Transformer from a DispatchRequest
     * @param request
     */
    constructor(request: iDispatchRequestSnapshot);
    /**
     * Do the action of a transformer
     * @param suite
     * @param runtime
     */
    transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseSnapshot>;
}
