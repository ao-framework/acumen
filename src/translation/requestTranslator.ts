import { iDispatchRequest } from "../contracts/dispatch/iDispatchRequest";

const requests = new WeakMap<RequestTranslator, iDispatchRequest<any, any>>()

export class RequestTranslator {

    public constructor(request: iDispatchRequest<any, any>) {
        requests.set(this, request);
    }
}
