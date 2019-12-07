import { iDispatchRequest } from "../contracts/dispatch/iDispatchRequest";
import { iDispatchResponse } from "../contracts/dispatch/iDispatchResponse";
import { RequestTranslator } from "./requestTranslator";
import { ResponseTranslator } from "./responseTranslator";

export function translateRequest(request: iDispatchRequest<any, any>) {
    return new RequestTranslator(request);
}

export function translateResponse(response: iDispatchResponse<any, any>) {
    return new ResponseTranslator(response);
}
