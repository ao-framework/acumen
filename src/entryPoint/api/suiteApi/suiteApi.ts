import { whenFunction } from "../../../commons/coolKids";
import { iApparatusFunction } from "../../../contracts/api/iApparatusFunction";
import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchResponseCoverage } from "../../../contracts/coverage/response/iDispatchResponseCoverage";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iDispatchResponseSchema } from "../../../contracts/schema/response/iDispatchResponseSchema";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { iDispatchResponseSnapshot } from "../../../contracts/snapshots/response/iDispatchResponseSnapshot";
import { Dispatch } from "../../dispatch/dispatch";
import { Controller } from "../../model/controller/controller";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";

const suites = new WeakMap<SuiteApi, Suite>()

export class SuiteApi {

    /**
     * Provide a Suite instance as an argument. It will create the instance
     * and store the suite in a weakmap for two reasons. One, it will inaccessible
     * via the instance and two. Two, garbage collection is more effienct.
     * @param suite 
     */
    constructor(suite: Suite) {
        suites.set(this, suite);
    }

    /**
     * Provide a string as an argument. It will set the suite description
     * to the string supplied. It will return the suite api
     * @param description 
     */
    public description(description: string) {
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
    public suite(name: string, handler?: (acumen: SuiteApi) => any) {
        const parentSuite = suites.get(this); // get the parent suite
        const childSuite = Suite.make({ name, parentSuite });
        const childSuiteApi = new SuiteApi(childSuite);
        whenFunction(handler)(childSuiteApi);
        parentSuite.suites[childSuite.name] = childSuite;
        return this;
    }

    /**
     * Provide test options an argument. It will register your test and
     * return the suite api
     * @param testOptions
     */
    public test(testOptions: iTestOptions) {
        const suite = suites.get(this)
        const test = Test.make(testOptions);
        test.context = testOptions;
        test.suiteInformation = Suite.logic.suiteInformation(suite);
        suite.tests[test.command] = test;
        return this;
    }

    /**
     * Provide a controller function as an argument. It will wire it up as the
     * suites controller. A suite can only have one controller. Keep in mind it 
     * will not throw an error if the controller is overwritten.
     * @param controllerFunction
     */
    public controller(controllerFunction: iApparatusFunction, timeout?: number) {
        const suite = suites.get(this)
        const controllerOptions = { command: "controller", run: controllerFunction, timeout, suite }
        const controller = Controller.make(controllerOptions);
        controller.suiteInformation = Suite.logic.suiteInformation(suite);
        suite.controller = controller;
        return this;
    }

    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    public async schema(): Promise<iSchemaResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/schema", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseSchema) => response.body.data)
    }

    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    public async snapshot(): Promise<iSnapshotResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/snapshot", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseSnapshot) => response.body.data);
    }

    /**
     * Provide coverage options as an argument. It will resolve the coverage for 
     * this suite on its own with out the need of an external processor.
     * @param options 
     */
    public async coverage(options: iCoverageOptions): Promise<iCoverageResponseData> {
        const suite = suites.get(this);
        const dispatch = new Dispatch(suite)
        const request = { userAgent: "self", url: "/coverage", body: {}, headers: {} }
        return dispatch.internalRequest(request)
            .then((response: iDispatchResponseCoverage) => response.body.data)
    }

    /**
     * Listen for external processor to execute this suite
     */
    public listen() {
        const suite = suites.get(this)
        const dispatch = new Dispatch(suite);
        dispatch.listen();
    }
}
