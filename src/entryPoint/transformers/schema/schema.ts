import { iTransformer } from "../../../contracts/dispatch/iTransformer";
import { iDispatchRequestSchema } from "../../../contracts/schema/request/iDispatchRequestSchema";
import { iDispatchResponseSchema } from "../../../contracts/schema/response/iDispatchResponseSchema";
import { Suite } from "../../model/suite/suite";
import { Runtime } from "../../runtime/runtime";
import { toSchema } from "./schemaLogic";

export class Schema implements iTransformer {

    /**
     * Creates the instance of the Schema transformer from a DispatchRequest
     * @param request 
     */
    public constructor(private request: iDispatchRequestSchema) { }

    /**
     * Do the action of a transformer
     * @param suite 
     * @param runtime 
     */
    public async transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponseSchema> {
        return Promise.resolve(toSchema(suite))
            .then(schema => {
                const response = {} as iDispatchResponseSchema
                response.url = "/schema";
                response.userAgent = "@transformer.schema";
                response.body = { data: schema };
                response.headers = this.request.headers;
                return response;
            })
    }
}
