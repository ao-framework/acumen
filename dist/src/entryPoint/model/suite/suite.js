"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const coolKids_1 = require("../../../commons/coolKids");
const state_1 = require("../state/state");
const suiteLogic = tslib_1.__importStar(require("./suiteLogic"));
class Suite {
    constructor() {
        /**
         * The list of all names leading up to
         * this particular suite
         */
        this.breadCrumbs = [];
        /**
         * Key / value pair of tests that belong
         * to this suite
         */
        this.tests = {};
        /**
         * Key / value pair of child suites that
         * belong to this suite
         */
        this.suites = {};
        /**
         * The state for this suite to be able to store
         * variables for recall in the process of running tests
         */
        this.state = new state_1.State();
    }
    /**
     * Factory method to create a suite
     * @param incomingOptions
     */
    static make(incomingOptions) {
        const suite = new Suite();
        const options = coolKids_1.ensureObject(incomingOptions);
        suite.name = suiteLogic.validateName(options.name);
        suite.breadCrumbs = suiteLogic.getBreadcrumbsFromParentSuite(options.parentSuite);
        suite.description = suiteLogic.validateDescription(options.description);
        suite.breadCrumbs.push(suite.name);
        return suite;
    }
}
exports.Suite = Suite;
/**
 * Static logic that pertains to the concept of a suite
 */
Suite.logic = suiteLogic;
//# sourceMappingURL=suite.js.map