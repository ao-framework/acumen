import { Suite } from "../../entryPoint/model/suite/suite";
import { Runtime } from "../../entryPoint/runtime/runtime";
import { iDispatchResponse } from "./iDispatchResponse";

export interface iTransformer {
    transform(suite: Suite, runtime: Runtime): Promise<iDispatchResponse<any, any>>
}
