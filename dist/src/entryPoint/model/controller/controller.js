"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const test_1 = require("../test/test");
/**
 * The controller is just a type of test
 */
class Controller extends test_1.Test {
    /**
     * Factory method for creating a controller
     * @param incomingOptions
     */
    static make(incomingOptions) {
        const test = new Controller();
        const options = coolKids_1.ensureObject(incomingOptions);
        test.breadCrumbs = options.suite.breadCrumbs.slice();
        test.breadCrumbs.push(options.command);
        test.command = coolKids_1.stringOrNothing(test.command) || "controller";
        test.description = coolKids_1.stringOrNothing(test.description);
        test.handler = coolKids_1.functionOrNothing(options.run);
        test.timeout = coolKids_1.numberOrDefault(options.timeout, 5000);
        return test;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map