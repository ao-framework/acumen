import { iSuiteOptions } from "../../../contracts/api/iSuiteOptions";
import { Controller } from "../controller/controller";
import { State } from "../state/state";
import { Test } from "../test/test";
import * as suiteLogic from "./suiteLogic";
export declare class Suite {
    /**
     * The name of the suite. The name it will
     * be reference by
     */
    name: string;
    /**
     * The description of the suite and all
     * of the tasks that it will do
     */
    description: string;
    /**
     * The list of all names leading up to
     * this particular suite
     */
    breadCrumbs: string[];
    /**
     * Let's us know which api created it
     */
    fromClass: boolean;
    /**
     * Key / value pair of tests that belong
     * to this suite
     */
    tests: {
        [key: string]: Test;
    };
    /**
     * Key / value pair of child suites that
     * belong to this suite
     */
    suites: {
        [key: string]: Suite;
    };
    /**
     * The controller for this suite. The main calling
     * function for this suite. It will perform all actions
     */
    controller: Controller;
    /**
     * The state for this suite to be able to store
     * variables for recall in the process of running tests
     */
    state: State;
    /**
     * Static logic that pertains to the concept of a suite
     */
    static logic: typeof suiteLogic;
    /**
     * Factory method to create a suite
     * @param incomingOptions
     */
    static make(incomingOptions: iSuiteOptions): Suite;
}
