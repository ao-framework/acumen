import { ensureArray, ensureObject, functionOrNothing, numberOrDefault, stringOrNothing, whenNotString, whenStringVoidOfCharacters } from "../../../commons/coolKids";
import { isFunction } from "../../../commons/validators";
import { diagram } from "../../../commons/variableDiagram";
import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { iSuiteInformation } from "../../../contracts/base/iSuiteInformation";
import { Controller } from "../controller/controller";
import { Spotlight } from "../testInstance/additions/spotlight";
import { Warning } from "../testInstance/additions/warning";
import { FailureInstance } from "../testInstance/failureInstance";
import { StubInstance } from "../testInstance/stubInstance";
import { SuccessInstance } from "../testInstance/successInstance";
import { TestInstance } from "../testInstance/testInstance";
import { generateID } from "../testInstance/testInstanceLogic";

export class Test {

    /**
     * The number of times this test has been called.
     */
    public callCount: number = 0;

    /**
     * The command name for the test
     */
    public command: string;

    /**
     * The description of the test
     */
    public description: string;

    /**
     * If the test was created via the suite class api
     */
    public fromClass: boolean;

    /**
     * The pointer to the function to fire.
     */
    public handler: Function;

    /**
     * The number of milliseconds to allow for this
     * test to finish
     */
    public timeout: number;

    /**
     * The context to fire the function in
     *  -- What is "this" in the function?
     */
    public context: any;

    /**
     * The digest suite information about the suite
     * that holds this test
     */
    public suiteInformation: iSuiteInformation;

    /**
     * All of the names leading up to this test
     */
    public breadCrumbs: string[] = [];

    /**
     * Holds all of the ran test instance for this test
     */
    public instances: TestInstance[] = []

    /**
     * Holds a list of log messages for this test
     */
    public log: string[] = [];

    /**
     * Whether or not this test has a function to fire
     */
    public get hasFunction(): boolean {
        return isFunction(this.handler);
    }

    /**
     * Factory method to create a test
     * @param incomingOptions 
     */
    static make(incomingOptions: iTestOptions) {
        const test = new Test();
        const options = ensureObject(incomingOptions);
        test.breadCrumbs = options.suite.breadCrumbs.slice()
        test.breadCrumbs.push(options.command);
        whenNotString(options.command, `Test command must be of type string`)
        whenStringVoidOfCharacters(options.command, `Test command can not be an empty string`)
        test.command = options.command;
        test.description = stringOrNothing(options.description);
        test.handler = functionOrNothing(options.run);
        test.timeout = numberOrDefault(options.timeout, 5000);
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
    public createSuccess(
        caller: Test | Controller,
        args: any[],
        spotlights: Spotlight[],
        warnings: Warning[],
        start: number,
        log: string[]
    ) {
        const success = new SuccessInstance()
        success.type = "success";
        success.caller = caller
        success.test = this;
        success.spotlights = ensureArray(spotlights)
        success.warnings = ensureArray(warnings)
        success.args = ensureArray(args).map(arg => diagram(arg))
        success.start = start;
        success.endBenchmark();
        success.breadCrumbs = this.breadCrumbs.slice();
        success.breadCrumbs.push(this.instances.length.toString());
        success.log = log;
        generateID(success);
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
    public createFailure(
        caller: Test | Controller,
        error: Error,
        args: any[],
        spotlights: Spotlight[],
        warnings: Warning[],
        start: number,
        log: string[]
    ) {
        const failure = new FailureInstance();
        failure.type = "failure";
        failure.caller = caller;
        failure.test = this;
        failure.setError(error);
        failure.spotlights = ensureArray(spotlights);
        failure.warnings = ensureArray(warnings);
        failure.args = ensureArray(args).map(arg => diagram(arg));
        failure.start = start;
        failure.endBenchmark();
        failure.breadCrumbs = this.breadCrumbs.slice();
        failure.breadCrumbs.push(this.instances.length.toString());
        failure.log = log;
        generateID(failure);
        this.instances.push(failure);
    }

    /**
     * Creates a stub instance
     * @param caller The controller/ test that called this test
     * @param args The argument passed to this test
     */
    public createStub(
        caller: Test | Controller,
        args: any[],
        log: string[]
    ) {
        const stub = new StubInstance();
        stub.caller = caller;
        stub.args = ensureArray(args).map(arg => diagram(arg));
        stub.breadCrumbs = this.breadCrumbs.slice();
        stub.breadCrumbs.push(this.instances.length.toString());
        stub.log = log;
        generateID(stub);
        this.instances.push(stub);
    }
}



