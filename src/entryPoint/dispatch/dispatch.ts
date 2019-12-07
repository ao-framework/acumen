import { throwExpection } from "../../commons/errorHandling";
import { isFunction, isNill } from "../../commons/validators";
import { iDispatchRequest } from "../../contracts/dispatch/iDispatchRequest";
import { iTransformer } from "../../contracts/dispatch/iTransformer";
import { iTranformerConstructor } from "../../contracts/dispatch/iTransformerConstructor";
import { Suite } from "../model/suite/suite";
import { Runtime } from "../runtime/runtime";
import { transformerMap } from "../transformers/transformers";

const currentSuite = new WeakMap<Dispatch, Suite>()

export class Dispatch {

    /**
     * Provide a Suite instance as an argument. It will create the instance
     * Dispatch and store the Suite instance in a weak map.
     * @param suite 
     */
    public constructor(suite: Suite) {
        currentSuite.set(this, suite);
    }

    /**
     * It will start listening for host processes that may
     * fork this script as a child process.
     */
    public listen() {
        process.on("message", this.message.bind(this))
    }

    /**
     * Provide a request an an argument. It will send it off to
     * the internal request method and send the response back to
     * the host process.
     * @param request 
     */
    public message(request: iDispatchRequest<any, any>) {
        this.internalRequest(request)
            .then(response => process.send(response))
    }

    /**
     * Provide an incoming request as an argument. It will convert it to a
     * qualified DispatchRequest instance, the transformer for the request, and
     * call the transform method on the transformer resolving a dispatch response
     * the caller.
     * @param incomingRequest 
     */
    public internalRequest(request: iDispatchRequest<any, any>) {
        const transformer = this.getTransformer(request);
        return transformer.transform(currentSuite.get(this), new Runtime());
    }

    /**
     * Provide the request as an argument. It will see if there is a registered
     * tranformer available for the request's url. If the there is, it will get
     * the constructor, validate, and return it.
     * @param request 
     */
    public getTransformer(request: iDispatchRequest<any, any>) {
        const constructor = transformerMap[request.url];
        this.validateTransformerConstructor(constructor, request);
        const transformer: iTransformer = this.makeTransformerInstance(constructor, request);
        this.validateTransformerMethods(transformer);
        return transformer;
    }

    /**
     * Provide a transformer as an element. It will make certain that is a
     * valid transformer.
     * @param transformer 
     */
    public validateTransformerMethods(transformer: iTransformer) {
        isNill(transformer) &&
            throwExpection(`Transformer is not defined`);
        !isFunction(transformer.transform) &&
            throwExpection(`Transformer "${transformer.constructor.name}" does not have a tranform method`)
    }

    /**
     * Provide function constructor and request as arguments. It will throw an exception
     * if the constructor is not valid.
     * @param constructor 
     * @param request 
     */
    public validateTransformerConstructor(constructor: iTranformerConstructor, request: iDispatchRequest<any, any>) {
        !isFunction(constructor) &&
            throwExpection(`Transformer does not exist "${request.url}"`)
    }

    /**
     * Provide a function constructor and request as arguments. It generate an instance of 
     * the transformer
     * @param constructor 
     * @param request 
     */
    public makeTransformerInstance(constructor: iTranformerConstructor, request: iDispatchRequest<any, any>) {
        return isFunction(constructor.make) ?
            constructor.make(request) :
            new constructor(request)
    }

}
