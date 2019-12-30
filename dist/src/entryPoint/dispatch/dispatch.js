"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../commons/errorHandling");
const validators_1 = require("../../commons/validators");
const runtime_1 = require("../runtime/runtime");
const transformers_1 = require("../transformers/transformers");
const currentSuite = new WeakMap();
class Dispatch {
    /**
     * Provide a Suite instance as an argument. It will create the instance
     * Dispatch and store the Suite instance in a weak map.
     * @param suite
     */
    constructor(suite) {
        currentSuite.set(this, suite);
    }
    /**
     * It will start listening for host processes that may
     * fork this script as a child process.
     */
    listen() {
        process.on("message", this.message.bind(this));
    }
    /**
     * Provide a request an an argument. It will send it off to
     * the internal request method and send the response back to
     * the host process.
     * @param request
     */
    message(request) {
        this.internalRequest(request)
            .then(response => process.send(response));
    }
    /**
     * Provide an incoming request as an argument. It will convert it to a
     * qualified DispatchRequest instance, the transformer for the request, and
     * call the transform method on the transformer resolving a dispatch response
     * the caller.
     * @param incomingRequest
     */
    internalRequest(request) {
        const transformer = this.getTransformer(request);
        return transformer.transform(currentSuite.get(this), new runtime_1.Runtime());
    }
    /**
     * Provide the request as an argument. It will see if there is a registered
     * tranformer available for the request's url. If the there is, it will get
     * the constructor, validate, and return it.
     * @param request
     */
    getTransformer(request) {
        const constructor = transformers_1.transformerMap[request.url];
        this.validateTransformerConstructor(constructor, request);
        const transformer = this.makeTransformerInstance(constructor, request);
        this.validateTransformerMethods(transformer);
        return transformer;
    }
    /**
     * Provide a transformer as an element. It will make certain that is a
     * valid transformer.
     * @param transformer
     */
    validateTransformerMethods(transformer) {
        validators_1.isNill(transformer) &&
            errorHandling_1.throwExpection(`Transformer is not defined`);
        !validators_1.isFunction(transformer.transform) &&
            errorHandling_1.throwExpection(`Transformer "${transformer.constructor.name}" does not have a tranform method`);
    }
    /**
     * Provide function constructor and request as arguments. It will throw an exception
     * if the constructor is not valid.
     * @param constructor
     * @param request
     */
    validateTransformerConstructor(constructor, request) {
        !validators_1.isFunction(constructor) &&
            errorHandling_1.throwExpection(`Transformer does not exist "${request.url}"`);
    }
    /**
     * Provide a function constructor and request as arguments. It generate an instance of
     * the transformer
     * @param constructor
     * @param request
     */
    makeTransformerInstance(constructor, request) {
        return validators_1.isFunction(constructor.make) ?
            constructor.make(request) :
            new constructor(request);
    }
}
exports.Dispatch = Dispatch;
//# sourceMappingURL=dispatch.js.map