import { throwExpection } from "../../../commons/errorHandling";
import { iErrorMessage } from "../../../contracts/error/helpers/iErrorMessage";
import { browser } from "../../api/acumen";
import { Controller } from "../../model/controller/controller";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";
import { RuntimeContainer } from "../runtimeContainer";
import { Apparatus } from "./apparatus";

/**
 * Helper method to ensure to either use the name provided or
 * scalp it from the function reference
 * @param context 
 */
export function byNameOrFunctionName(context: string | Function) {
    if (typeof context === "string") { return context; }
    return context.name;
}

/**
 * Handles binding all of the method on the apparatus to the apparatus
 * so that when they are destructured, everything still works properly
 * @param apparatus 
 * @param container 
 */
export function bindFunctions(apparatus: Apparatus, container: RuntimeContainer) {
    apparatus.browser = browser;
    apparatus.parallel = apparatus.parallel.bind(apparatus);
    apparatus.suite = apparatus.suite.bind(apparatus);
    apparatus.test = apparatus.test.bind(apparatus)
    apparatus.testAll = apparatus.testAll.bind(apparatus)
    apparatus.spotlight = apparatus.spotlight.bind(apparatus);
    apparatus.warning = apparatus.warning.bind(apparatus);
    apparatus.generator = apparatus.generator.bind(apparatus)
    apparatus.loop = apparatus.loop.bind(apparatus);
    apparatus.state = container.state;
    apparatus.suiteState = container.suite.state;
    apparatus.beforeThrowing = apparatus.beforeThrowing.bind(apparatus);
}


/**
 * Gets the child suite but throws an error if it doesn't exist
 * @param suite 
 * @param name 
 * @param message 
 */
export function whenChildSuite(suite: Suite, name: string, message: iErrorMessage) {
    return suite.suites[name] instanceof Suite ?
        suite.suites[name] :
        <never>throwExpection(message())
}

/**
 * Get the controller from a suite but throws an error if it doesn't exist
 * @param suite 
 * @param message 
 */
export function whenSuiteController(suite: Suite, message: iErrorMessage) {
    return suite.controller instanceof Controller ?
        suite.controller :
        <never>throwExpection(message())
}

/**
 * Gets a test from a suite but throws an error if it doesn't exist
 * @param suite 
 * @param name 
 * @param message 
 */
export function whenTest(suite: Suite, name: string, message: iErrorMessage) {
    return suite.tests[name] instanceof Test ?
        suite.tests[name] :
        <never>throwExpection(message())
}

/**
 * Gets the fully qualified name of a suite or test
 * @param context 
 */
export function suiteOrTestFullName(context: Suite | Test) {
    return context.breadCrumbs.join("/")
}

/**
 * Helper method to loop through all tests
 * @param suite 
 * @param handler 
 */
export function eachTest(suite: Suite, handler: (test: Test) => any) {
    for (let iterator in suite.tests) {
        handler(suite.tests[iterator]);
    }
}
