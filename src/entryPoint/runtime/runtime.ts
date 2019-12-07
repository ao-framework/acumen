import { performance } from "perf_hooks";

import { whenFunction } from "../../commons/coolKids";
import { State } from "../model/state/state";
import { Suite } from "../model/suite/suite";
import { Test } from "../model/test/test";
import { Apparatus } from "./apparatus/apparatus";
import { RuntimeContainer } from "./runtimeContainer";

export class Runtime {

    /**
     * Whether or not a lean build is requested
     */
    public isLean: boolean = false;

    /**
     * How many promises are currently out
     */
    public awaiting: number = 0;

    /**
     * How many have returned
     */
    public returned: number = 0;

    /**
     * Holds the global state for this runtime
     */
    public globalState = new State();

    /**
     * Whether or not this runtime instance is complete
     */
    public get complete() {
        return this.awaiting === this.returned;
    }

    /**
     * Lease the root suite to the runtime. It will be resolved to back
     * when the runtime is complete
     * @param suite 
     */
    public leaseSuite(suite: Suite): Promise<Suite> {
        return new Promise((done) => {
            if (suite.controller) {
                this.processTest(suite, null, suite.controller, [])
                const timer = setInterval(() => {
                    if (this.complete) {
                        clearInterval(timer);
                        console.log(`Runtime completed ${new Date().toUTCString()}`)
                        done(suite);
                    }
                }, 100)
            } else {
                throw new Error("Suite must have a controller")
            }
        })
    }

    /**
     * Method for the apparatus to push a test into the runtime
     * @param suite 
     * @param caller 
     * @param test 
     * @param args 
     */
    public processTest(suite: Suite, caller: Test, test: Test, args: any[]) {
        const runtimeContainer = new RuntimeContainer();
        runtimeContainer.state = this.globalState;
        runtimeContainer.suite = suite;
        runtimeContainer.caller = test;
        runtimeContainer.test = test;
        runtimeContainer.runtime = this;
        const apparatus = new Apparatus(runtimeContainer);
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
    public async callable(caller: Test, test: Test, apparatus: Apparatus, container: RuntimeContainer, args: any[]): Promise<void> {
        const log: string[] = [];
        test.callCount++;
        if (!test.hasFunction) {
            log.push("ignored because has no function")
            test.createStub(caller, args, log);
            return Promise.resolve()
        }
        this.awaiting++;
        args.unshift(apparatus);
        const start = performance.now();
        try {
            log.push(`init by ${caller ? caller.breadCrumbs.join(">") : 'core'}`)
            const response = test.handler.apply(test.context, args);
            if (response instanceof Promise) {
                log.push(`promise detected`)
                return new Promise((done) => {
                    let resolved: boolean = false;
                    let counter = 0;
                    let promiseReturned: boolean = false;
                    log.push(`timer started`)
                    const timer = setInterval(() => {
                        if (promiseReturned) {
                            log.push("timer disgarded");
                            clearInterval(timer)
                        } else {
                            if (counter > test.timeout) {
                                log.push("timer protocol invoked");
                                clearInterval(timer);
                                resolved = true;
                                whenFunction(apparatus["beforeThrowingHandler"])();
                                this.returned++;
                                const error = new Error(`Timeout Error: [${test.breadCrumbs.join("/")}] took longer than ${test.timeout}ms to run`)
                                log.push(`timer resolved`);
                                test.createFailure(caller, error, args, container.spotlights, container.warnings, start, log)
                                done();
                            } else {
                                log.push(`timer incremented to: ${counter}`)
                                counter += 1000;
                            }
                        }
                    }, 1000)
                    response
                        .then(() => {
                            promiseReturned = true;
                            if (!resolved) {
                                this.returned++;
                                log.push(`resolved`)
                                test.createSuccess(caller, args, container.spotlights, container.warnings, start, log)
                                done();
                            }
                        })
                        .catch(err => {
                            promiseReturned = true;
                            if (!resolved) {
                                whenFunction(apparatus["beforeThrowingHandler"])();
                                this.returned++;
                                log.push(`resolved with error`)
                                test.createFailure(caller, err, args, container.spotlights, container.warnings, start, log)
                                done();
                            }
                        })
                })
            } else {
                this.returned++;
                test.createSuccess(caller, args, container.spotlights, container.warnings, start, log);
                return Promise.resolve()
            }
        } catch (err) {
            whenFunction(apparatus["beforeThrowingHandler"])();
            this.returned++;
            log.push(`resolved synchronously with error`)
            test.createFailure(caller, err, args, container.spotlights, container.warnings, start, log)
            return Promise.resolve()
        }
    }

}
