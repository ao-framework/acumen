"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provide a Suite instance as an argument. It will remap the Suite instance
 * to a iSnapshotResponse and return a promise that will eventually resolve
 * the iSnapshotResponse.
 * @param suite
 */
async function createSnapshot(suite) {
    return resolveSuite(suite).then((snapshot) => {
        return { suite: snapshot };
    });
}
exports.createSnapshot = createSnapshot;
/**
 * Provide an instance of Suite and a callback (to be notified of errors) as argument. It will then
 * remap the suite to an iSnapshotSuite instance. It will return a Promise and will eventually resolve
 * the iSnapshotSuite instance.
 * @param suite
 * @param parentContainsFailure
 */
async function resolveSuite(suite, parentContainsFailure = () => { }) {
    const snapshotSuite = {};
    snapshotSuite.containsFailures = false;
    const suiteContainsFailure = () => {
        snapshotSuite.containsFailures = true;
        parentContainsFailure();
    };
    snapshotSuite.name = suite.name;
    snapshotSuite.breadCrumbs = suite.breadCrumbs;
    snapshotSuite.description = suite.description;
    snapshotSuite.controller = await resolveTest(suite.controller, suiteContainsFailure);
    snapshotSuite.tests = {};
    for (var iterator in suite.tests) {
        snapshotSuite.tests[iterator] = await resolveTest(suite.tests[iterator], suiteContainsFailure);
    }
    snapshotSuite.suites = {};
    for (var iterator in suite.suites) {
        snapshotSuite.suites[iterator] = await resolveSuite(suite.suites[iterator], suiteContainsFailure);
    }
    return snapshotSuite;
}
exports.resolveSuite = resolveSuite;
/**
 * Provide a Test instance and a callback (to be notified of errors) as arguments. It will remap the Test
 * instance to an iSnapshotTest instance. It will return a Promise and eventually resolve the iSnapshotTest
 * @param test
 * @param suiteContainsFailure
 */
async function resolveTest(test, suiteContainsFailure) {
    const snapshotTest = {};
    snapshotTest.command = test.command;
    snapshotTest.description = test.description;
    snapshotTest.timeout = test.timeout;
    snapshotTest.suiteInformation = test.suiteInformation;
    const promises = test.instances.map(instance => resolveTestInstance(instance, snapshotTest, suiteContainsFailure));
    snapshotTest.instances = await Promise.all(promises);
    snapshotTest.instances.forEach(instance => {
        if (instance.type === "failure") {
            snapshotTest.containsFailures = true;
        }
    });
    snapshotTest.breadCrumbs = test.breadCrumbs;
    return snapshotTest;
}
exports.resolveTest = resolveTest;
/**
 * Promise a TestInstance instance, Test instance, and a callback (to be notified of errors) as arguments. It will
 * remap the TestInstance to iSnapshotTestInstance. It will return a Promise that will eventually resolve a iSnapshotTestInstance.
 * @param instance
 * @param test
 * @param suiteContainsFailure
 */
async function resolveTestInstance(instance, test, suiteContainsFailure) {
    const snapshotInstance = {};
    snapshotInstance.id = instance.id;
    snapshotInstance.type = instance.type;
    if (snapshotInstance.type === "failure") {
        test.containsFailures = true;
        suiteContainsFailure();
    }
    snapshotInstance.testCommand = instance.test.command;
    snapshotInstance.callerSuiteName = instance.caller ? instance.caller.suiteInformation.name : null;
    snapshotInstance.callerTestCommand = instance.caller ? instance.caller.command : null;
    snapshotInstance.start = instance.start;
    snapshotInstance.end = instance.end;
    snapshotInstance.time = instance.time;
    snapshotInstance.error = instance.error;
    snapshotInstance.spotlights = instance.spotlights;
    snapshotInstance.warnings = instance.warnings;
    snapshotInstance.args = instance.args;
    snapshotInstance.breadCrumbs = instance.breadCrumbs;
    return snapshotInstance;
}
exports.resolveTestInstance = resolveTestInstance;
//# sourceMappingURL=snapshotLogic.js.map