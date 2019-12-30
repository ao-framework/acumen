"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../../commons/errorHandling");
const acumen_1 = require("../../api/acumen");
const controller_1 = require("../../model/controller/controller");
const suite_1 = require("../../model/suite/suite");
const test_1 = require("../../model/test/test");
/**
 * Helper method to ensure to either use the name provided or
 * scalp it from the function reference
 * @param context
 */
function byNameOrFunctionName(context) {
    if (typeof context === "string") {
        return context;
    }
    return context.name;
}
exports.byNameOrFunctionName = byNameOrFunctionName;
/**
 * Handles binding all of the method on the apparatus to the apparatus
 * so that when they are destructured, everything still works properly
 * @param apparatus
 * @param container
 */
function bindFunctions(apparatus, container) {
    apparatus.browser = acumen_1.browser;
    apparatus.parallel = apparatus.parallel.bind(apparatus);
    apparatus.suite = apparatus.suite.bind(apparatus);
    apparatus.test = apparatus.test.bind(apparatus);
    apparatus.testAll = apparatus.testAll.bind(apparatus);
    apparatus.spotlight = apparatus.spotlight.bind(apparatus);
    apparatus.warning = apparatus.warning.bind(apparatus);
    apparatus.generator = apparatus.generator.bind(apparatus);
    apparatus.loop = apparatus.loop.bind(apparatus);
    apparatus.state = container.state;
    apparatus.suiteState = container.suite.state;
    apparatus.beforeThrowing = apparatus.beforeThrowing.bind(apparatus);
}
exports.bindFunctions = bindFunctions;
/**
 * Gets the child suite but throws an error if it doesn't exist
 * @param suite
 * @param name
 * @param message
 */
function whenChildSuite(suite, name, message) {
    return suite.suites[name] instanceof suite_1.Suite ?
        suite.suites[name] :
        errorHandling_1.throwExpection(message());
}
exports.whenChildSuite = whenChildSuite;
/**
 * Get the controller from a suite but throws an error if it doesn't exist
 * @param suite
 * @param message
 */
function whenSuiteController(suite, message) {
    return suite.controller instanceof controller_1.Controller ?
        suite.controller :
        errorHandling_1.throwExpection(message());
}
exports.whenSuiteController = whenSuiteController;
/**
 * Gets a test from a suite but throws an error if it doesn't exist
 * @param suite
 * @param name
 * @param message
 */
function whenTest(suite, name, message) {
    return suite.tests[name] instanceof test_1.Test ?
        suite.tests[name] :
        errorHandling_1.throwExpection(message());
}
exports.whenTest = whenTest;
/**
 * Gets the fully qualified name of a suite or test
 * @param context
 */
function suiteOrTestFullName(context) {
    return context.breadCrumbs.join("/");
}
exports.suiteOrTestFullName = suiteOrTestFullName;
/**
 * Helper method to loop through all tests
 * @param suite
 * @param handler
 */
function eachTest(suite, handler) {
    for (let iterator in suite.tests) {
        handler(suite.tests[iterator]);
    }
}
exports.eachTest = eachTest;
//# sourceMappingURL=apparatusLogic.js.map