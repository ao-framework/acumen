import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { iTransformer } from "../../contracts/dispatch/iTransformer";
import { iTranformerConstructor } from "../../contracts/dispatch/iTransformerConstructor";
import { Suite } from "../model/suite/suite";
export declare class Dispatch {
    /**
     * Provide a Suite instance as an argument. It will create the instance
     * Dispatch and store the Suite instance in a weak map.
     * @param suite
     */
    constructor(suite: Suite);
    /**
     * It will start listening for host processes that may
     * fork this script as a child process.
     */
    listen(): void;
    /**
     * Provide a request an an argument. It will send it off to
     * the internal request method and send the response back to
     * the host process.
     * @param request
     */
    message(request: iDispatchRequest<any, any>): void;
    /**
     * Provide an incoming request as an argument. It will convert it to a
     * qualified DispatchRequest instance, the transformer for the request, and
     * call the transform method on the transformer resolving a dispatch response
     * the caller.
     * @param incomingRequest
     */
    internalRequest(request: iDispatchRequest<any, any>): Promise<import("../../contracts/dispatch/iDispatchResponse").iDispatchResponse<any, any>>;
    /**
     * Provide the request as an argument. It will see if there is a registered
     * tranformer available for the request's url. If the there is, it will get
     * the constructor, validate, and return it.
     * @param request
     */
    getTransformer(request: iDispatchRequest<any, any>): iTransformer;
    /**
     * Provide a transformer as an element. It will make certain that is a
     * valid transformer.
     * @param transformer
     */
    validateTransformerMethods(transformer: iTransformer): void;
    /**
     * Provide function constructor and request as arguments. It will throw an exception
     * if the constructor is not valid.
     * @param constructor
     * @param request
     */
    validateTransformerConstructor(constructor: iTranformerConstructor, request: iDispatchRequest<any, any>): void;
    /**
     * Provide a function constructor and request as arguments. It generate an instance of
     * the transformer
     * @param constructor
     * @param request
     */
    makeTransformerInstance(constructor: iTranformerConstructor, request: iDispatchRequest<any, any>): iTransformer;
}
