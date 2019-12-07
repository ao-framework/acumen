import { ensureObject, functionOrNothing, numberOrDefault, stringOrNothing } from "../../../commons/coolKids";
import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { Test } from "../test/test";

/**
 * The controller is just a type of test
 */
export class Controller extends Test {

    /**
     * Factory method for creating a controller
     * @param incomingOptions 
     */
    static make(incomingOptions: iTestOptions) {
        const test = new Controller();
        const options = ensureObject(incomingOptions);
        test.breadCrumbs = options.suite.breadCrumbs.slice()
        test.breadCrumbs.push(options.command);
        test.command = stringOrNothing(test.command) || "controller"
        test.description = stringOrNothing(test.description);
        test.handler = functionOrNothing(options.run);
        test.timeout = numberOrDefault(options.timeout, 5000);
        return test;
    }

}
