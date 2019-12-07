import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { iSnapshotSuite } from "../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../contracts/snapshots/model/iSnapshotTestInstance";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";
import { TestInstance } from "../../model/testInstance/testInstance";

/**
 * Provide a Suite instance as an argument. It will remap the Suite instance
 * to a iSnapshotResponse and return a promise that will eventually resolve
 * the iSnapshotResponse.
 * @param suite 
 */
export async function createSnapshot(suite: Suite): Promise<iSnapshotResponseData> {
    return resolveSuite(suite).then((snapshot) => {
        return { suite: snapshot }
    })
}

/**
 * Provide an instance of Suite and a callback (to be notified of errors) as argument. It will then
 * remap the suite to an iSnapshotSuite instance. It will return a Promise and will eventually resolve
 * the iSnapshotSuite instance.
 * @param suite 
 * @param parentContainsFailure 
 */
export async function resolveSuite(suite: Suite, parentContainsFailure: Function = () => { }): Promise<iSnapshotSuite> {
    const snapshotSuite = {} as iSnapshotSuite;
    snapshotSuite.containsFailures = false;
    const suiteContainsFailure = () => {
        snapshotSuite.containsFailures = true;
        parentContainsFailure();
    }
    snapshotSuite.name = suite.name;
    snapshotSuite.breadCrumbs = suite.breadCrumbs;
    snapshotSuite.description = suite.description;
    snapshotSuite.controller = await resolveTest(suite.controller, suiteContainsFailure);
    snapshotSuite.tests = {};
    for (var iterator in suite.tests) {
        snapshotSuite.tests[iterator] = await resolveTest(suite.tests[iterator], suiteContainsFailure);
    }
    snapshotSuite.suites = {}
    for (var iterator in suite.suites) {
        snapshotSuite.suites[iterator] = await resolveSuite(suite.suites[iterator], suiteContainsFailure);
    }
    return snapshotSuite;
}

/**
 * Provide a Test instance and a callback (to be notified of errors) as arguments. It will remap the Test
 * instance to an iSnapshotTest instance. It will return a Promise and eventually resolve the iSnapshotTest
 * @param test 
 * @param suiteContainsFailure 
 */
export async function resolveTest(test: Test, suiteContainsFailure: Function): Promise<iSnapshotTest> {
    const snapshotTest = {} as iSnapshotTest;
    snapshotTest.command = test.command;
    snapshotTest.description = test.description;
    snapshotTest.timeout = test.timeout;
    snapshotTest.suiteInformation = test.suiteInformation;
    const promises = test.instances.map(instance => resolveTestInstance(instance, snapshotTest, suiteContainsFailure))
    snapshotTest.instances = await Promise.all(promises);
    snapshotTest.instances.forEach(instance => {
        if (instance.type === "failure") {
            snapshotTest.containsFailures = true;
        }
    })
    snapshotTest.breadCrumbs = test.breadCrumbs;
    return snapshotTest;
}

/**
 * Promise a TestInstance instance, Test instance, and a callback (to be notified of errors) as arguments. It will
 * remap the TestInstance to iSnapshotTestInstance. It will return a Promise that will eventually resolve a iSnapshotTestInstance.
 * @param instance 
 * @param test 
 * @param suiteContainsFailure 
 */
export async function resolveTestInstance(instance: TestInstance, test: iSnapshotTest, suiteContainsFailure: Function): Promise<iSnapshotTestInstance> {
    const snapshotInstance = {} as iSnapshotTestInstance
    snapshotInstance.id = instance.id;
    snapshotInstance.type = instance.type;
    if (snapshotInstance.type === "failure") {
        test.containsFailures = true;
        suiteContainsFailure()
    }
    snapshotInstance.testCommand = instance.test.command;
    snapshotInstance.callerSuiteName = instance.caller ? instance.caller.suiteInformation.name : null;
    snapshotInstance.callerTestCommand = instance.caller ? instance.caller.command : null;
    snapshotInstance.start = instance.start;
    snapshotInstance.end = instance.end;
    snapshotInstance.time = instance.time;
    snapshotInstance.error = instance.error;
    snapshotInstance.spotlights = instance.spotlights
    snapshotInstance.warnings = instance.warnings
    snapshotInstance.args = instance.args
    snapshotInstance.breadCrumbs = instance.breadCrumbs
    return snapshotInstance;
}

