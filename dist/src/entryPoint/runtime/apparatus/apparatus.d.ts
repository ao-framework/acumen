/// <reference types="chai" />
/// <reference types="faker" />
import { iApparatusFunctionWithReturn } from "../../../contracts/api/iApparatusFunction";
import { iFunction } from "../../../contracts/base/iFunction";
import { iPromiseList } from "../../../contracts/base/iPromiseList";
import { browser } from "../../api/acumen";
import { State } from "../../model/state/state";
import { RuntimeContainer } from "../runtimeContainer";
import { Tagger } from "./tagManager";
export declare class Apparatus {
    /**
     * Holds the master handler that the runtime will call
     * when there is an error
     */
    private beforeThrowingHandler;
    /**
     * Holds the global state instance
     */
    state: State;
    /**
     * Holds the state instance assign to this test's host suite
     */
    suiteState: State;
    /**
     * Holds the Chai Static Assertions
     */
    chai: Chai.ChaiStatic;
    /**
     * Shortcut to Chai Expect
     */
    expect: Chai.ExpectStatic;
    /**
     * When a new instance is required, this function is called
     */
    browser: typeof browser;
    /**
     * Holds an instance of the faker library
     */
    faker: Faker.FakerStatic;
    /**
     * Creates this instance of the apparatus and handles setup
     * @param container
     */
    constructor(container: RuntimeContainer);
    tagger(): Tagger;
    /**
     * Assign a function that will fire before this test exits
     * after throwing an error
     * @param handlers
     */
    beforeThrowing(...handlers: iFunction[]): this;
    /**
     * Run promises in parallel
     * @param handler
     */
    parallel(handler: (list: iPromiseList) => any): Promise<any[]>;
    /**
     * Calls a child suite in the suite directly with any arguments you provide
     * @param name
     * @param args
     */
    suite(name: string | Function, ...args: any[]): Promise<void>;
    /**
     * Calls a test in the suite directly passing any arguments you provide
     * @param command
     * @param args
     */
    test(command: string | Function, ...args: any[]): Promise<void>;
    /**
     * Helper method to call all tests in the suite except itself.
     * Be careful with this one. If called from more than one test,
     * it could cause a max call stack error.
     * @param args
     */
    testAll(...args: any[]): Promise<any[]>;
    /**
     * Allows you to generate data for testing purposes without it being directly in your test
     * or controller. Pass a function by reference and that function will be called in context
     * of the local suite with the apparatus passed as its first argument along with any other
     * arguments you pass
     * @param handler
     * @param args
     */
    generator<Context>(handler: iApparatusFunctionWithReturn<Context>, ...args: any[]): any;
    /**
     * Helper function to write loops. I hate writing traditional for counting loops!
     * @param from
     * @param to
     * @param handler
     */
    loop<Context>(from: number, to: number, handler: (index: number) => Context): Context[];
    /**
     * Send a spotlight to server environments
     * @param name
     * @param data
     */
    spotlight<Context>(name: string, data: Context): Context;
    /**
     * Send a warning to server environments
     * @param message
     * @param data
     */
    warning<Context>(message: string, data: Context): Context;
}
