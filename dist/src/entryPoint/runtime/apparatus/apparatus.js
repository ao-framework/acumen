"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = tslib_1.__importDefault(require("chai"));
const faker_1 = tslib_1.__importDefault(require("faker"));
const coolKids_1 = require("../../../commons/coolKids");
const errorHandling_1 = require("../../../commons/errorHandling");
const spotlight_1 = require("../../model/testInstance/additions/spotlight");
const warning_1 = require("../../model/testInstance/additions/warning");
const apparatusLogic_1 = require("./apparatusLogic");
const tagManager_1 = require("./tagManager");
const containers = new WeakMap();
const beforeThrowHandlers = new WeakMap();
function callBeforeThrow(apparatus) {
    return () => {
        beforeThrowHandlers.get(apparatus)
            .forEach(handler => handler());
    };
}
class Apparatus {
    /**
     * Creates this instance of the apparatus and handles setup
     * @param container
     */
    constructor(container) {
        /**
         * Holds the master handler that the runtime will call
         * when there is an error
         */
        this.beforeThrowingHandler = callBeforeThrow(this);
        /**
         * Holds the Chai Static Assertions
         */
        this.chai = chai_1.default;
        /**
         * Shortcut to Chai Expect
         */
        this.expect = chai_1.default.expect;
        /**
         * Holds an instance of the faker library
         */
        this.faker = faker_1.default;
        containers.set(this, container);
        beforeThrowHandlers.set(this, []);
        apparatusLogic_1.bindFunctions(this, container);
    }
    tagger() {
        return new tagManager_1.Tagger();
    }
    /**
     * Assign a function that will fire before this test exits
     * after throwing an error
     * @param handlers
     */
    beforeThrowing(...handlers) {
        beforeThrowHandlers.get(this).push(...handlers);
        return this;
    }
    /**
     * Run promises in parallel
     * @param handler
     */
    async parallel(handler) {
        const list = [];
        return Promise.resolve()
            .then(() => coolKids_1.whenFunction(handler)(list))
            .then(() => Promise.all(list));
    }
    /**
     * Calls a child suite in the suite directly with any arguments you provide
     * @param name
     * @param args
     */
    suite(name, ...args) {
        name = apparatusLogic_1.byNameOrFunctionName(name);
        const container = containers.get(this);
        const childSuite = apparatusLogic_1.whenChildSuite(container.suite, name, () => {
            const suiteName = apparatusLogic_1.suiteOrTestFullName(container.suite);
            return `Could not find the child suite named "${name}" registered to (${suiteName})`;
        });
        const childSuiteController = apparatusLogic_1.whenSuiteController(childSuite, () => {
            const suiteName = apparatusLogic_1.suiteOrTestFullName(childSuite);
            return `No controller exists for ${suiteName}`;
        });
        return container.runtime.processTest(childSuite, container.test, childSuiteController, args);
    }
    /**
     * Calls a test in the suite directly passing any arguments you provide
     * @param command
     * @param args
     */
    test(command, ...args) {
        command = apparatusLogic_1.byNameOrFunctionName(command);
        const container = containers.get(this);
        const test = apparatusLogic_1.whenTest(container.suite, command, () => {
            const suiteName = apparatusLogic_1.suiteOrTestFullName(container.suite);
            return `Could not find a test named "${command}" registered to (${suiteName})`;
        });
        return container.runtime.processTest(container.suite, container.test, test, args);
    }
    /**
     * Helper method to call all tests in the suite except itself.
     * Be careful with this one. If called from more than one test,
     * it could cause a max call stack error.
     * @param args
     */
    async testAll(...args) {
        const container = containers.get(this);
        return this.parallel(list => {
            apparatusLogic_1.eachTest(container.suite, (test) => {
                if (test !== container.test) { // infinite recursion safety
                    list.push(container.runtime.processTest(container.suite, container.test, test, args.slice()));
                }
            });
        });
    }
    /**
     * Allows you to generate data for testing purposes without it being directly in your test
     * or controller. Pass a function by reference and that function will be called in context
     * of the local suite with the apparatus passed as its first argument along with any other
     * arguments you pass
     * @param handler
     * @param args
     */
    generator(handler, ...args) {
        const container = containers.get(this);
        args.unshift(this);
        const response = handler.apply(container.test.context, args);
        if (response instanceof Promise) {
            response.catch(err => { });
            errorHandling_1.throwExpection(`Generators can not return a promise. The generator (${apparatusLogic_1.byNameOrFunctionName(handler)}) returned a promise.`);
        }
        return response;
    }
    /**
     * Helper function to write loops. I hate writing traditional for counting loops!
     * @param from
     * @param to
     * @param handler
     */
    loop(from, to, handler) {
        const returns = [];
        for (let i = from; i <= to; i++) {
            returns.push(handler(i));
        }
        return returns;
    }
    /**
     * Send a spotlight to server environments
     * @param name
     * @param data
     */
    spotlight(name, data) {
        const container = containers.get(this);
        if (!container.runtime.isLean) {
            const spotlight = spotlight_1.Spotlight.make(name, data);
            container.spotlights.push(spotlight);
        }
        return data;
    }
    /**
     * Send a warning to server environments
     * @param message
     * @param data
     */
    warning(message, data) {
        const container = containers.get(this);
        if (!container.runtime.isLean) {
            const warning = warning_1.Warning.make(message, data);
            container.warnings.push(warning);
        }
        return data;
    }
}
exports.Apparatus = Apparatus;
//# sourceMappingURL=apparatus.js.map