import { iDispatchRequest } from "../contracts/dispatch/iDispatchRequest";
import { iDispatchResponse } from "../contracts/dispatch/iDispatchResponse";
import { RequestTranslator } from "./requestTranslator";
import { ResponseTranslator } from "./responseTranslator";
export declare function translateRequest(request: iDispatchRequest<any, any>): RequestTranslator;
export declare function translateResponse(response: iDispatchResponse<any, any>): ResponseTranslator;
