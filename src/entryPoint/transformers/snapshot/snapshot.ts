import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { iDispatchRequestSnapshot } from "../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { iDispatchResponseSnapshot } from "../../../contracts/snapshots/response/iDispatchResponseSnapshot";
import { iDispatchResponseSnapshotHeaders } from "../../../contracts/snapshots/response/iDispatchResponseSnapshotHeaders";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
import { createSnapshot } from "./snapshotLogic";

export class Snapshot implements iTransformer {

    /**
     * Creates an instance of the Snapshot Transformer from a DispatchRequest
     * @param request 
     */
    public constructor(private request: iDispatchRequestSnapshot) { }

    /**
     * Do the action of a transformer
     * @param suite 
     * @param runtime 
     */
    public async transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseSnapshot> {
        return Promise.resolve()
            .then(() => runtime.leaseSuite(suite))
            .then(suite => createSnapshot(suite))
            .then(snapshotResponse => {
                const response = {} as iDispatchResponseSnapshot;
                response.url = "/snapshot";
                response.userAgent = "@transformer.snapshot";
                response.headers = this.request.headers as iDispatchResponseSnapshotHeaders
                response.body = { data: snapshotResponse };
                return response;
            })
    }

}
