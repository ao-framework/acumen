import inspector from "inspector";
import { normalize } from "path";

import { rejectIf } from "../../../commons/coolKids";
import { iCoverageTable } from "../../../contracts/coverage/helpers/iCoverageTable";

/**
 * It will orchestrate the process of getting a session from the inspector,
 * enabling the profiler and resolving the session
 */
export async function startCoverage() {
    const session = startSession()
    return enableProfiler(session)
        .then(() => startPreciseCoverage(session))
        .then(() => session);
}

/**
 * Provide an inspector session as an argument. It will orchestra the
 * shutting down of coverage. It will resolve a coverage snapshot.
 * @param session 
 */
export async function endCoverage(session: inspector.Session) {
    let tempCoverage: inspector.Profiler.TakePreciseCoverageReturnType;
    return takeCoverage(session)
        .then(coverage => {
            tempCoverage = coverage;
            return stopCoverage(session);
        })
        .then(() => tempCoverage)
}

/**
 * Provide the coverage snapshot as argument. It will create a object table where the
 * keys are the file paths and the values are the coverage details.
 * @param coverage 
 */
export function generateTable(coverage: inspector.Profiler.TakePreciseCoverageReturnType) {
    const table: iCoverageTable = {}
    coverage.result.forEach(script => {
        if (script.url.indexOf("file://") === 0) {
            table[normalize(script.url.replace(/file\:\/\/\//g, ""))] = script;
        }
    })
    return table;
}

/**
 * Starts and connects a session with the built
 * V8 inspector.
 */
export function startSession() {
    const session = new inspector.Session()
    session.connect();
    return session;
}

/**
 * Provide an inspector session as an argument. It will enable
 * the profiler in the inspector
 * @param session 
 */
export async function enableProfiler(session: inspector.Session) {
    return new Promise((done, error) => {
        session.post("Profiler.enable", (err) => {
            rejectIf(err, error, () => done())
        })
    })
}

/**
 * Provide an inspector session as an argument. It start taking
 * precise coverage via the inspector.
 * @param session 
 */
export async function startPreciseCoverage(session: inspector.Session) {
    return new Promise((done, error) => {
        const params = { callCount: false, detailed: true };
        session.post("Profiler.startPreciseCoverage", params, (err) => {
            rejectIf(err, error, () => done())
        })
    })
}

/**
 * Provide an inspector session. It will take a snapshot of the precise coverage
 * from the inspector
 * @param session 
 */
export async function takeCoverage(session: inspector.Session): Promise<inspector.Profiler.TakePreciseCoverageReturnType> {
    return new Promise((done, error) => {
        session.post("Profiler.takePreciseCoverage", (err, coverage) => {
            rejectIf(err, error, () => done(coverage))
        })
    })
}

/**
 * Provide an inspector session as an argument. It will stop taking
 * precise coverage in the inspector
 * @param session 
 */
export async function stopCoverage(session: inspector.Session): Promise<void> {
    return new Promise((done, error) => {
        session.post("Profiler.stopPreciseCoverage", (err) => {
            rejectIf(err, error, () => done())
        })
    })
}

