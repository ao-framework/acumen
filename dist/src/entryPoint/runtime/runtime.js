"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const coolKids_1 = require("../../commons/coolKids");
const state_1 = require("../model/state/state");
const apparatus_1 = require("./apparatus/apparatus");
const runtimeContainer_1 = require("./runtimeContainer");
class Runtime {
    constructor() {
        /**
         * Whether or not a lean build is requested
         */
        this.isLean = false;
        /**
         * How many promises are currently out
         */
        this.awaiting = 0;
        /**
         * How many have returned
         */
        this.returned = 0;
        /**
         * Holds the global state for this runtime
         */
        this.globalState = new state_1.State();
    }
    /**
     * Whether or not this runtime instance is complete
     */
    get complete() {
        return this.awaiting === this.returned;
    }
    /**
     * Lease the root suite to the runtime. It will be resolved to back
     * when the runtime is complete
     * @param suite
     */
    leaseSuite(suite) {
        return new Promise((done) => {
            if (suite.controller) {
                this.processTest(suite, null, suite.controller, []);
                const timer = setInterval(() => {
                    if (this.complete) {
                        clearInterval(timer);
                        console.log(`Runtime completed ${new Date().toUTCString()}`);
                        done(suite);
                    }
                }, 100);
            }
            else {
                throw new Error("Suite must have a controller");
            }
        });
    }
    /**
     * Method for the apparatus to push a test into the runtime
     * @param suite
     * @param caller
     * @param test
     * @param args
     */
    processTest(suite, caller, test, args) {
        const runtimeContainer = new runtimeContainer_1.RuntimeContainer();
        runtimeContainer.state = this.globalState;
        runtimeContainer.suite = suite;
        runtimeContainer.caller = test;
        runtimeContainer.test = test;
        runtimeContainer.runtime = this;
        const apparatus = new apparatus_1.Apparatus(runtimeContainer);
        return this.callable(caller, test, apparatus, runtimeContainer, args);
    }
    /**
     * The logic for dealing with async and sync functions and report errors
     * @param caller
     * @param test
     * @param apparatus
     * @param container
     * @param args
     */
    async callable(caller, test, apparatus, container, args) {
        const log = [];
        test.callCount++;
        if (!test.hasFunction) {
            log.push("ignored because has no function");
            test.createStub(caller, args, log);
            return Promise.resolve();
        }
        this.awaiting++;
        args.unshift(apparatus);
        const start = perf_hooks_1.performance.now();
        try {
            log.push(`init by ${caller ? caller.breadCrumbs.join(">") : 'core'}`);
            const response = test.handler.apply(test.context, args);
            if (response instanceof Promise) {
                log.push(`promise detected`);
                return new Promise((done) => {
                    let resolved = false;
                    let counter = 0;
                    let promiseReturned = false;
                    log.push(`timer started`);
                    const timer = setInterval(() => {
                        if (promiseReturned) {
                            log.push("timer disgarded");
                            clearInterval(timer);
                        }
                        else {
                            if (counter > test.timeout) {
                                log.push("timer protocol invoked");
                                clearInterval(timer);
                                resolved = true;
                                coolKids_1.whenFunction(apparatus["beforeThrowingHandler"])();
                                this.returned++;
                                const error = new Error(`Timeout Error: [${test.breadCrumbs.join("/")}] took longer than ${test.timeout}ms to run`);
                                log.push(`timer resolved`);
                                test.createFailure(caller, error, args, container.spotlights, container.warnings, start, log);
                                done();
                            }
                            else {
                                log.push(`timer incremented to: ${counter}`);
                                counter += 1000;
                            }
                        }
                    }, 1000);
                    response
                        .then(() => {
                        promiseReturned = true;
                        if (!resolved) {
                            this.returned++;
                            log.push(`resolved`);
                            test.createSuccess(caller, args, container.spotlights, container.warnings, start, log);
                            done();
                        }
                    })
                        .catch(err => {
                        promiseReturned = true;
                        if (!resolved) {
                            coolKids_1.whenFunction(apparatus["beforeThrowingHandler"])();
                            this.returned++;
                            log.push(`resolved with error`);
                            test.createFailure(caller, err, args, container.spotlights, container.warnings, start, log);
                            done();
                        }
                    });
                });
            }
            else {
                this.returned++;
                test.createSuccess(caller, args, container.spotlights, container.warnings, start, log);
                return Promise.resolve();
            }
        }
        catch (err) {
            coolKids_1.whenFunction(apparatus["beforeThrowingHandler"])();
            this.returned++;
            log.push(`resolved synchronously with error`);
            test.createFailure(caller, err, args, container.spotlights, container.warnings, start, log);
            return Promise.resolve();
        }
    }
}
exports.Runtime = Runtime;
//# sourceMappingURL=runtime.js.map