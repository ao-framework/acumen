import * as inspector from "inspector";

import { iDispatchRequestCoverage } from "../../../contracts/coverage/request/iDispatchRequestCoverage";
import { iDispatchResponseCoverage } from "../../../contracts/coverage/response/iDispatchResponseCoverage";
import { iDispatchResponseCoverageHeaders } from "../../../contracts/coverage/response/iDispatchResponseCoverageHeaders";
import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
import * as logic from "./coverageLogic";
import * as coverageLogic from "./coverageProfiler";

export class Coverage implements iTransformer {

    /**
     * Creates an instance of the Coverage Transformer from a DispatchRequest
     * @param request 
     */
    public constructor(private request: iDispatchRequestCoverage) { }

    /**
     * Do the action of a transformer
     * @param suite 
     * @param runtime 
     */
    public async transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseCoverage> {
        let tempSession: inspector.Session;
        return Promise.resolve()
            .then(() => coverageLogic.startCoverage())
            .then((session) => tempSession = session)
            .then(() => runtime.leaseSuite(suite))
            .then(() => coverageLogic.endCoverage(tempSession))
            .then(profilerCoverage => logic.createCoverageReport(this.request, profilerCoverage))
            .then((rootDirectory) => {
                const response = {} as iDispatchResponseCoverage
                response.url = "/coverage";
                response.headers = this.request.headers as iDispatchResponseCoverageHeaders;
                response.body = { data: { directory: rootDirectory } }
                response.userAgent = "@transformer.coverage"
                return response;
            })
    }
}

