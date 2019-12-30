"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inspector_1 = tslib_1.__importDefault(require("inspector"));
const path_1 = require("path");
const coolKids_1 = require("../../../commons/coolKids");
/**
 * It will orchestrate the process of getting a session from the inspector,
 * enabling the profiler and resolving the session
 */
async function startCoverage() {
    const session = startSession();
    return enableProfiler(session)
        .then(() => startPreciseCoverage(session))
        .then(() => session);
}
exports.startCoverage = startCoverage;
/**
 * Provide an inspector session as an argument. It will orchestra the
 * shutting down of coverage. It will resolve a coverage snapshot.
 * @param session
 */
async function endCoverage(session) {
    let tempCoverage;
    return takeCoverage(session)
        .then(coverage => {
        tempCoverage = coverage;
        return stopCoverage(session);
    })
        .then(() => tempCoverage);
}
exports.endCoverage = endCoverage;
/**
 * Provide the coverage snapshot as argument. It will create a object table where the
 * keys are the file paths and the values are the coverage details.
 * @param coverage
 */
function generateTable(coverage) {
    const table = {};
    coverage.result.forEach(script => {
        if (script.url.indexOf("file://") === 0) {
            table[path_1.normalize(script.url.replace(/file\:\/\/\//g, ""))] = script;
        }
    });
    return table;
}
exports.generateTable = generateTable;
/**
 * Starts and connects a session with the built
 * V8 inspector.
 */
function startSession() {
    const session = new inspector_1.default.Session();
    session.connect();
    return session;
}
exports.startSession = startSession;
/**
 * Provide an inspector session as an argument. It will enable
 * the profiler in the inspector
 * @param session
 */
async function enableProfiler(session) {
    return new Promise((done, error) => {
        session.post("Profiler.enable", (err) => {
            coolKids_1.rejectIf(err, error, () => done());
        });
    });
}
exports.enableProfiler = enableProfiler;
/**
 * Provide an inspector session as an argument. It start taking
 * precise coverage via the inspector.
 * @param session
 */
async function startPreciseCoverage(session) {
    return new Promise((done, error) => {
        const params = { callCount: false, detailed: true };
        session.post("Profiler.startPreciseCoverage", params, (err) => {
            coolKids_1.rejectIf(err, error, () => done());
        });
    });
}
exports.startPreciseCoverage = startPreciseCoverage;
/**
 * Provide an inspector session. It will take a snapshot of the precise coverage
 * from the inspector
 * @param session
 */
async function takeCoverage(session) {
    return new Promise((done, error) => {
        session.post("Profiler.takePreciseCoverage", (err, coverage) => {
            coolKids_1.rejectIf(err, error, () => done(coverage));
        });
    });
}
exports.takeCoverage = takeCoverage;
/**
 * Provide an inspector session as an argument. It will stop taking
 * precise coverage in the inspector
 * @param session
 */
async function stopCoverage(session) {
    return new Promise((done, error) => {
        session.post("Profiler.stopPreciseCoverage", (err) => {
            coolKids_1.rejectIf(err, error, () => done());
        });
    });
}
exports.stopCoverage = stopCoverage;
//# sourceMappingURL=coverageProfiler.js.map