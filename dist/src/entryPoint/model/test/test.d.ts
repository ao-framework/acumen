import { iTestOptions } from "../../../contracts/api/iTestOptions";
import { iSuiteInformation } from "../../../contracts/base/iSuiteInformation";
import { Controller } from "../controller/controller";
import { Spotlight } from "../testInstance/additions/spotlight";
import { Warning } from "../testInstance/additions/warning";
import { TestInstance } from "../testInstance/testInstance";
export declare class Test {
    /**
     * The number of times this test has been called.
     */
    callCount: number;
    /**
     * The command name for the test
     */
    command: string;
    /**
     * The description of the test
     */
    description: string;
    /**
     * If the test was created via the suite class api
     */
    fromClass: boolean;
    /**
     * The pointer to the function to fire.
     */
    handler: Function;
    /**
     * The number of milliseconds to allow for this
     * test to finish
     */
    timeout: number;
    /**
     * The context to fire the function in
     *  -- What is "this" in the function?
     */
    context: any;
    /**
     * The digest suite information about the suite
     * that holds this test
     */
    suiteInformation: iSuiteInformation;
    /**
     * All of the names leading up to this test
     */
    breadCrumbs: string[];
    /**
     * Holds all of the ran test instance for this test
     */
    instances: TestInstance[];
    /**
     * Holds a list of log messages for this test
     */
    log: string[];
    /**
     * Whether or not this test has a function to fire
     */
    get hasFunction(): boolean;
    /**
     * Factory method to create a test
     * @param incomingOptions
     */
    static make(incomingOptions: iTestOptions): Test;
    /**
     * Create a success instance
     * @param caller The controller/ test that called it
     * @param args The arguments passed to it
     * @param spotlights The spotlight items taken while running
     * @param warnings The warning items taken while running
     * @param start The time that the test started
     */
    createSuccess(caller: Test | Controller, args: any[], spotlights: Spotlight[], warnings: Warning[], start: number, log: string[]): void;
    /**
     * Create a failure instance
     * @param caller The controller/ test that called it
     * @param error The error that caused the failure instance to be created
     * @param args The arguments passed to it
     * @param spotlights The spotlight items taken while running
     * @param warnings The warning items taken while running
     * @param start The time that the test started
     */
    createFailure(caller: Test | Controller, error: Error, args: any[], spotlights: Spotlight[], warnings: Warning[], start: number, log: string[]): void;
    /**
     * Creates a stub instance
     * @param caller The controller/ test that called this test
     * @param args The argument passed to this test
     */
    createStub(caller: Test | Controller, args: any[], log: string[]): void;
}
