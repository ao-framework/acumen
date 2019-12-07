import chai from "chai";
import faker from "faker";

import { whenFunction } from "../../../commons/coolKids";
import { throwExpection } from "../../../commons/errorHandling";
import { iApparatusFunctionWithReturn } from "../../../contracts/api/iApparatusFunction";
import { iFunction } from "../../../contracts/base/iFunction";
import { iPromiseList } from "../../../contracts/base/iPromiseList";
import { browser } from "../../api/acumen";
import { State } from "../../model/state/state";
import { Spotlight } from "../../model/testInstance/additions/spotlight";
import { Warning } from "../../model/testInstance/additions/warning";
import { RuntimeContainer } from "../runtimeContainer";
import { bindFunctions, byNameOrFunctionName, eachTest, suiteOrTestFullName, whenChildSuite, whenSuiteController, whenTest } from "./apparatusLogic";
import { Tagger } from './tagManager';

const containers = new WeakMap<Apparatus, RuntimeContainer>()
const beforeThrowHandlers = new WeakMap<Apparatus, iFunction[]>();

function callBeforeThrow(apparatus: Apparatus) {
    return () => {
        beforeThrowHandlers.get(apparatus)
            .forEach(handler => handler())
    }
}

export class Apparatus {
    /**
     * Holds the master handler that the runtime will call
     * when there is an error
     */
    private beforeThrowingHandler: iFunction = callBeforeThrow(this);

    /**
     * Holds the global state instance
     */
    public state: State

    /**
     * Holds the state instance assign to this test's host suite
     */
    public suiteState: State;

    /**
     * Holds the Chai Static Assertions
     */
    public chai: Chai.ChaiStatic = chai;

    /**
     * Shortcut to Chai Expect
     */
    public expect: Chai.ExpectStatic = chai.expect;

    /**
     * When a new instance is required, this function is called
     */
    public browser: typeof browser;

    /**
     * Holds an instance of the faker library
     */
    public faker: Faker.FakerStatic = faker

    /**
     * Creates this instance of the apparatus and handles setup
     * @param container 
     */
    public constructor(container: RuntimeContainer) {
        containers.set(this, container);
        beforeThrowHandlers.set(this, []);
        bindFunctions(this, container);
    }

    public tagger() {
        return new Tagger();
    }

    /**
     * Assign a function that will fire before this test exits
     * after throwing an error
     * @param handlers 
     */
    public beforeThrowing(...handlers: iFunction[]) {
        beforeThrowHandlers.get(this).push(...handlers);
        return this;
    }

    /**
     * Run promises in parallel
     * @param handler 
     */
    public async parallel(handler: (list: iPromiseList) => any) {
        const list = [];
        return Promise.resolve()
            .then(() => whenFunction(handler)(list))
            .then(() => Promise.all(list))
    }

    /**
     * Calls a child suite in the suite directly with any arguments you provide
     * @param name
     * @param args
     */
    public suite(name: string | Function, ...args: any[]) {
        name = byNameOrFunctionName(name);
        const container = containers.get(this);
        const childSuite = whenChildSuite(container.suite, name, () => {
            const suiteName = suiteOrTestFullName(container.suite)
            return `Could not find the child suite named "${name}" registered to (${suiteName})`;
        })
        const childSuiteController = whenSuiteController(childSuite, () => {
            const suiteName = suiteOrTestFullName(childSuite)
            return `No controller exists for ${suiteName}`
        })
        return container.runtime.processTest(childSuite, container.test, childSuiteController, args)
    }

    /**
     * Calls a test in the suite directly passing any arguments you provide
     * @param command 
     * @param args 
     */
    public test(command: string | Function, ...args: any[]) {
        command = byNameOrFunctionName(command);
        const container = containers.get(this);
        const test = whenTest(container.suite, command, () => {
            const suiteName = suiteOrTestFullName(container.suite)
            return `Could not find a test named "${command}" registered to (${suiteName})`
        })
        return container.runtime.processTest(container.suite, container.test, test, args);
    }

    /**
     * Helper method to call all tests in the suite except itself.
     * Be careful with this one. If called from more than one test,
     * it could cause a max call stack error.
     * @param args 
     */
    public async testAll(...args: any[]) {
        const container = containers.get(this);
        return this.parallel(list => {
            eachTest(container.suite, (test) => {
                if (test !== container.test) { // infinite recursion safety
                    list.push(container.runtime.processTest(container.suite, container.test, test, args.slice()))
                }
            })
        })
    }

    /**
     * Allows you to generate data for testing purposes without it being directly in your test
     * or controller. Pass a function by reference and that function will be called in context 
     * of the local suite with the apparatus passed as its first argument along with any other
     * arguments you pass
     * @param handler 
     * @param args 
     */
    public generator<Context>(handler: iApparatusFunctionWithReturn<Context>, ...args: any[]) {
        const container = containers.get(this)
        args.unshift(this)
        const response = handler.apply(container.test.context, args);
        if (response instanceof Promise) {
            response.catch(err => { })
            throwExpection(`Generators can not return a promise. The generator (${byNameOrFunctionName(handler)}) returned a promise.`)
        }
        return response;
    }

    /**
     * Helper function to write loops. I hate writing traditional for counting loops!
     * @param from 
     * @param to 
     * @param handler 
     */
    public loop<Context>(from: number, to: number, handler: (index: number) => Context): Context[] {
        const returns: Context[] = []
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
    public spotlight<Context>(name: string, data: Context) {
        const container = containers.get(this);
        if (!container.runtime.isLean) {
            const spotlight = Spotlight.make(name, data);
            container.spotlights.push(spotlight);
        }
        return data;
    }

    /**
     * Send a warning to server environments
     * @param message 
     * @param data 
     */
    public warning<Context>(message: string, data: Context) {
        const container = containers.get(this)
        if (!container.runtime.isLean) {
            const warning = Warning.make(message, data);
            container.warnings.push(warning);
        }
        return data;
    }

}
