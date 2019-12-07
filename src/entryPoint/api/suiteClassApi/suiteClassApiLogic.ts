import { ensureArray, ensureObject } from "../../../commons/coolKids";
import { getMethodNames } from "../../../commons/helpers";
import { iAcumenSuiteConstructor } from "../../../contracts/api/iAcumenSuiteConstructor";
import { Controller } from "../../model/controller/controller";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";

/**
 * Provide a Acumen Suite Class as an argument. It will convert the class
 * declaration into a fully qualified Suite instance and return it.
 * @param suiteClass 
 */
export function makeSuite(suiteClass: iAcumenSuiteConstructor): Suite {
    return processSuiteClass(suiteClass)
}

/**
 * Provide a Acumen Suite Class and a parent suite (optional) as arguments. It will 
 * convert the class declaration into a fully qualified Suite instance and return it.
 * @param suiteConstructor 
 * @param parentSuite 
 */
export function processSuiteClass(suiteConstructor: iAcumenSuiteConstructor, parentSuite?: Suite) {
    const suiteClass = new suiteConstructor();
    const methodNames = getMethodNames(suiteClass).filter(isNotGenerator);
    const suites = ensureArray(suiteClass.suites);
    const descriptions = ensureObject(suiteClass.descriptions);
    const timeouts = ensureObject(suiteClass.timeouts);
    const suite = Suite.make({
        name: suiteClass.name || suiteClass.constructor.name,
        parentSuite,
        description: descriptions["suite"]
    })
    methodNames.map(method => {
        if (method === "controller") {
            return Controller.make({
                command: method,
                description: descriptions[method] || `The controller for ${suite.breadCrumbs.join(" > ")}`,
                run: suiteClass[method],
                timeout: timeouts[method],
                suite
            })
        } else {
            return Test.make({
                command: method,
                description: descriptions[method],
                run: suiteClass[method],
                timeout: timeouts[method],
                suite
            })
        }
    }).forEach(test => {
        test.context = suiteClass;
        test.suiteInformation = Suite.logic.suiteInformation(suite);
        test.fromClass = true;
        if (test instanceof Controller) {
            suite.controller = test;
        } else {
            suite.tests[test.command] = test;
        }
    })
    suites.map(childSuiteConstructor => processSuiteClass(childSuiteConstructor, suite))
        .forEach(childSuite => suite.suites[childSuite.name] = childSuite);
    return suite;
}

/**
 * Provide a method name as an argument. It will let return
 * a boolean value indicating that it is not a Generator
 * @param method 
 */
export function isNotGenerator(method: string) {
    return method.charAt(0) !== "$";
}
