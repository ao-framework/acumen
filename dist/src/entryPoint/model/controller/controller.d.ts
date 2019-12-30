import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { Test } from "../test/test";
/**
 * The controller is just a type of test
 */
export declare class Controller extends Test {
    /**
     * Factory method for creating a controller
     * @param incomingOptions
     */
    static make(incomingOptions: iTestOptions): Controller;
}
