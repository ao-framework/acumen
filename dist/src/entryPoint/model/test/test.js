"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const validators_1 = require("../../../commons/validators");
const variableDiagram_1 = require("../../../commons/variableDiagram");
const failureInstance_1 = require("../testInstance/failureInstance");
const stubInstance_1 = require("../testInstance/stubInstance");
const successInstance_1 = require("../testInstance/successInstance");
const testInstanceLogic_1 = require("../testInstance/testInstanceLogic");
class Test {
    constructor() {
        /**
         * The number of times this test has been called.
         */
        this.callCount = 0;
        /**
         * All of the names leading up to this test
         */
        this.breadCrumbs = [];
        /**
         * Holds all of the ran test instance for this test
         */
        this.instances = [];
        /**
         * Holds a list of log messages for this test
         */
        this.log = [];
    }
    /**
     * Whether or not this test has a function to fire
     */
    get hasFunction() {
        return validators_1.isFunction(this.handler);
    }
    /**
     * Factory method to create a test
     * @param incomingOptions
     */
    static make(incomingOptions) {
        const test = new Test();
        const options = coolKids_1.ensureObject(incomingOptions);
        test.breadCrumbs = options.suite.breadCrumbs.slice();
        test.breadCrumbs.push(options.command);
        coolKids_1.whenNotString(options.command, `Test command must be of type string`);
        coolKids_1.whenStringVoidOfCharacters(options.command, `Test command can not be an empty string`);
        test.command = options.command;
        test.description = coolKids_1.stringOrNothing(options.description);
        test.handler = coolKids_1.functionOrNothing(options.run);
        test.timeout = coolKids_1.numberOrDefault(options.timeout, 5000);
        return test;
    }
    /**
     * Create a success instance
     * @param caller The controller/ test that called it
     * @param args The arguments passed to it
     * @param spotlights The spotlight items taken while running
     * @param warnings The warning items taken while running
     * @param start The time that the test started
     */
    createSuccess(caller, args, spotlights, warnings, start, log) {
        const success = new successInstance_1.SuccessInstance();
        success.type = "success";
        success.caller = caller;
        success.test = this;
        success.spotlights = coolKids_1.ensureArray(spotlights);
        success.warnings = coolKids_1.ensureArray(warnings);
        success.args = coolKids_1.ensureArray(args).map(arg => variableDiagram_1.diagram(arg));
        success.start = start;
        success.endBenchmark();
        success.breadCrumbs = this.breadCrumbs.slice();
        success.breadCrumbs.push(this.instances.length.toString());
        success.log = log;
        testInstanceLogic_1.generateID(success);
        this.instances.push(success);
    }
    /**
     * Create a failure instance
     * @param caller The controller/ test that called it
     * @param error The error that caused the failure instance to be created
     * @param args The arguments passed to it
     * @param spotlights The spotlight items taken while running
     * @param warnings The warning items taken while running
     * @param start The time that the test started
     */
    createFailure(caller, error, args, spotlights, warnings, start, log) {
        const failure = new failureInstance_1.FailureInstance();
        failure.type = "failure";
        failure.caller = caller;
        failure.test = this;
        failure.setError(error);
        failure.spotlights = coolKids_1.ensureArray(spotlights);
        failure.warnings = coolKids_1.ensureArray(warnings);
        failure.args = coolKids_1.ensureArray(args).map(arg => variableDiagram_1.diagram(arg));
        failure.start = start;
        failure.endBenchmark();
        failure.breadCrumbs = this.breadCrumbs.slice();
        failure.breadCrumbs.push(this.instances.length.toString());
        failure.log = log;
        testInstanceLogic_1.generateID(failure);
        this.instances.push(failure);
    }
    /**
     * Creates a stub instance
     * @param caller The controller/ test that called this test
     * @param args The argument passed to this test
     */
    createStub(caller, args, log) {
        const stub = new stubInstance_1.StubInstance();
        stub.caller = caller;
        stub.args = coolKids_1.ensureArray(args).map(arg => variableDiagram_1.diagram(arg));
        stub.breadCrumbs = this.breadCrumbs.slice();
        stub.breadCrumbs.push(this.instances.length.toString());
        stub.log = log;
        testInstanceLogic_1.generateID(stub);
        this.instances.push(stub);
    }
}
exports.Test = Test;
//# sourceMappingURL=test.js.map