import { iApparatusFunction } from "../../../contracts/api/iApparatusFunction";
import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { Suite } from "../../model/suite/suite";
export declare class SuiteApi {
    /**
     * Provide a Suite instance as an argument. It will create the instance
     * and store the suite in a weakmap for two reasons. One, it will inaccessible
     * via the instance and two. Two, garbage collection is more effienct.
     * @param suite
     */
    constructor(suite: Suite);
    /**
     * Provide a string as an argument. It will set the suite description
     * to the string supplied. It will return the suite api
     * @param description
     */
    description(description: string): this;
    /**
     * Provide a name of the child suite and a callback to send the "child" Suite instance to
     * as arguments. It wire up the suite as a child suite and automatically call the callback.
     * It will return the suite api.
     * @param name
     * @param handler
     */
    suite(name: string, handler?: (acumen: SuiteApi) => any): this;
    /**
     * Provide test options an argument. It will register your test and
     * return the suite api
     * @param testOptions
     */
    test(testOptions: iTestOptions): this;
    /**
     * Provide a controller function as an argument. It will wire it up as the
     * suites controller. A suite can only have one controller. Keep in mind it
     * will not throw an error if the controller is overwritten.
     * @param controllerFunction
     */
    controller(controllerFunction: iApparatusFunction, timeout?: number): this;
    /**
     * It will resolve the schema for this suite on its own
     * with out the need of an external processor.
     */
    schema(): Promise<iSchemaResponseData>;
    /**
     * It will resolve the snapshot for this suite on its own
     * with out the need of an external processor.
     */
    snapshot(): Promise<iSnapshotResponseData>;
    /**
     * Provide coverage options as an argument. It will resolve the coverage for
     * this suite on its own with out the need of an external processor.
     * @param options
     */
    coverage(options: iCoverageOptions): Promise<iCoverageResponseData>;
    /**
     * Listen for external processor to execute this suite
     */
    listen(): void;
}
