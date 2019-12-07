import { iDispatchRequest } from "./iDispatchRequest";
import { iTransformer } from "./iTransformer";

export interface iTranformerConstructor {
    new(request: iDispatchRequest<any, any>): iTransformer
    make?(request: iDispatchRequest<any, any>): iTransformer
}
