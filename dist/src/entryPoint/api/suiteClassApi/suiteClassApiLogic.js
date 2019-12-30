"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const helpers_1 = require("../../../commons/helpers");
const controller_1 = require("../../model/controller/controller");
const suite_1 = require("../../model/suite/suite");
const test_1 = require("../../model/test/test");
/**
 * Provide a Acumen Suite Class as an argument. It will convert the class
 * declaration into a fully qualified Suite instance and return it.
 * @param suiteClass
 */
function makeSuite(suiteClass) {
    return processSuiteClass(suiteClass);
}
exports.makeSuite = makeSuite;
/**
 * Provide a Acumen Suite Class and a parent suite (optional) as arguments. It will
 * convert the class declaration into a fully qualified Suite instance and return it.
 * @param suiteConstructor
 * @param parentSuite
 */
function processSuiteClass(suiteConstructor, parentSuite) {
    const suiteClass = new suiteConstructor();
    const methodNames = helpers_1.getMethodNames(suiteClass).filter(isNotGenerator);
    const suites = coolKids_1.ensureArray(suiteClass.suites);
    const descriptions = coolKids_1.ensureObject(suiteClass.descriptions);
    const timeouts = coolKids_1.ensureObject(suiteClass.timeouts);
    const suite = suite_1.Suite.make({
        name: suiteClass.name || suiteClass.constructor.name,
        parentSuite,
        description: descriptions["suite"]
    });
    methodNames.map(method => {
        if (method === "controller") {
            return controller_1.Controller.make({
                command: method,
                description: descriptions[method] || `The controller for ${suite.breadCrumbs.join(" > ")}`,
                run: suiteClass[method],
                timeout: timeouts[method],
                suite
            });
        }
        else {
            return test_1.Test.make({
                command: method,
                description: descriptions[method],
                run: suiteClass[method],
                timeout: timeouts[method],
                suite
            });
        }
    }).forEach(test => {
        test.context = suiteClass;
        test.suiteInformation = suite_1.Suite.logic.suiteInformation(suite);
        test.fromClass = true;
        if (test instanceof controller_1.Controller) {
            suite.controller = test;
        }
        else {
            suite.tests[test.command] = test;
        }
    });
    suites.map(childSuiteConstructor => processSuiteClass(childSuiteConstructor, suite))
        .forEach(childSuite => suite.suites[childSuite.name] = childSuite);
    return suite;
}
exports.processSuiteClass = processSuiteClass;
/**
 * Provide a method name as an argument. It will let return
 * a boolean value indicating that it is not a Generator
 * @param method
 */
function isNotGenerator(method) {
    return method.charAt(0) !== "$";
}
exports.isNotGenerator = isNotGenerator;
//# sourceMappingURL=suiteClassApiLogic.js.map