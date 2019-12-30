"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const dispatch_1 = require("../../dispatch/dispatch");
const controller_1 = require("../../model/controller/controller");
const suite_1 = require("../../model/suite/suite");
const test_1 = require("../../model/test/test");
const suites = new WeakMap();
class SuiteApi {
    /**
     * Provide a Suite instance as an argument. It will create the instance
     * and store the suite in a weakmap for two reasons. One, it will inaccessible
     * via the instance and two. Two, garbage collection is more effienct.
     * @param suite
     */
    constructor(suite) {
        suites.set(this, suite);
    }
    /**
     * Provide a string as an argument. It will set the suite description
     * to the string supplied. It will return the suite api
     * @param description
     */
    description(description) {
        const suite = suites.get(this);
        suite.description = description;
        return this;
    }
    /**
     * Provide a name of the child suite and a callback to send the "child" Suite instance to
     * as arguments. It wire up the suite as a child suite and automatically call the callback.
     * It will return the suite api.
     * @param name
     * @param handler
     */
    suite(name, handler) {
        const parentSuite = suites.get(this); // get the parent suite
        const childSuite = suite_1.Suite.make({ name, parentSuite });
        const childSuiteApi = new SuiteApi(childSuite);
        coolKids_1.whenFunction(handler)(childSuiteApi);
        parentSuite.suites[childSuite.name] = childSuite;
        return this;
    }
    /**
     * Provide test options an argument. It will register your test and
     * return the suite api
     * @param testOptions
     */
    test(testOptions) {
        const suite = suites.get(this);
        const test = test_1.Test.make(testOptions);
        test.context = testOptions;
        test.suiteInformation = suite_1.Suite.logic.suiteInformation(suite);
        suite.tests[test.command] = test;
        return this;
    }
    /**
     * Provide a controller function as an argument. It will wire it up as the
     * suites controller. A suite can only have one controller. Keep in mind it
     * will not throw an error if the controller is overwritten.
     * @param controllerFunction
     */
    controller(controllerFunction, timeout) {
        const suite = suites.get(this);
        const controllerOptions = { command: "controller", run: controllerFunction, timeout, suite };
        const controller = controller_1.Controller.make(controllerOptions);
        controller.suiteInformation = suite_1.Suite.logic.suiteInformation(suite);
        suite.controller = controller;
        return this;
    }
    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    async schema() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/schema", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    async snapshot() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/snapshot", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * Provide coverage options as an argument. It will resolve the coverage for
     * this suite on its own with out the need of an external processor.
     * @param options
     */
    async coverage(options) {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        const request = { userAgent: "self", url: "/coverage", body: {}, headers: {} };
        return dispatch.internalRequest(request)
            .then((response) => response.body.data);
    }
    /**
     * Listen for external processor to execute this suite
     */
    listen() {
        const suite = suites.get(this);
        const dispatch = new dispatch_1.Dispatch(suite);
        dispatch.listen();
    }
}
exports.SuiteApi = SuiteApi;
//# sourceMappingURL=suiteApi.js.map