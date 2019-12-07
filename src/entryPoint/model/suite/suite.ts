import { ensureObject } from "../../../commons/coolKids";
import { iSuiteOptions } from "../../../contracts/api/iSuiteOptions";
import { Controller } from "../controller/controller";
import { State } from "../state/state";
import { Test } from "../test/test";
import * as suiteLogic from "./suiteLogic";

export class Suite {

    /**
     * The name of the suite. The name it will
     * be reference by
     */
    public name: string;

    /**
     * The description of the suite and all
     * of the tasks that it will do
     */
    public description: string;

    /**
     * The list of all names leading up to
     * this particular suite
     */
    public breadCrumbs: string[] = [];

    /**
     * Let's us know which api created it
     */
    public fromClass: boolean;

    /**
     * Key / value pair of tests that belong
     * to this suite
     */
    public tests: { [key: string]: Test } = {}

    /**
     * Key / value pair of child suites that
     * belong to this suite
     */
    public suites: { [key: string]: Suite } = {}

    /**
     * The controller for this suite. The main calling
     * function for this suite. It will perform all actions
     */
    public controller: Controller;

    /**
     * The state for this suite to be able to store
     * variables for recall in the process of running tests
     */
    public state: State = new State();

    /**
     * Static logic that pertains to the concept of a suite
     */
    static logic = suiteLogic

    /**
     * Factory method to create a suite
     * @param incomingOptions 
     */
    static make(incomingOptions: iSuiteOptions) {
        const suite = new Suite();
        const options = ensureObject(incomingOptions);
        suite.name = suiteLogic.validateName(options.name);
        suite.breadCrumbs = suiteLogic.getBreadcrumbsFromParentSuite(options.parentSuite);
        suite.description = suiteLogic.validateDescription(options.description);
        suite.breadCrumbs.push(suite.name);
        return suite;
    }
}

