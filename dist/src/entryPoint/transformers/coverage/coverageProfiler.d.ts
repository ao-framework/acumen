/// <reference types="node" />
import inspector from "inspector";
import { iCoverageTable } from "../../../contracts/coverage/helpers/iCoverageTable";
/**
 * It will orchestrate the process of getting a session from the inspector,
 * enabling the profiler and resolving the session
 */
export declare function startCoverage(): Promise<inspector.Session>;
/**
 * Provide an inspector session as an argument. It will orchestra the
 * shutting down of coverage. It will resolve a coverage snapshot.
 * @param session
 */
export declare function endCoverage(session: inspector.Session): Promise<inspector.Profiler.TakePreciseCoverageReturnType>;
/**
 * Provide the coverage snapshot as argument. It will create a object table where the
 * keys are the file paths and the values are the coverage details.
 * @param coverage
 */
export declare function generateTable(coverage: inspector.Profiler.TakePreciseCoverageReturnType): iCoverageTable;
/**
 * Starts and connects a session with the built
 * V8 inspector.
 */
export declare function startSession(): inspector.Session;
/**
 * Provide an inspector session as an argument. It will enable
 * the profiler in the inspector
 * @param session
 */
export declare function enableProfiler(session: inspector.Session): Promise<unknown>;
/**
 * Provide an inspector session as an argument. It start taking
 * precise coverage via the inspector.
 * @param session
 */
export declare function startPreciseCoverage(session: inspector.Session): Promise<unknown>;
/**
 * Provide an inspector session. It will take a snapshot of the precise coverage
 * from the inspector
 * @param session
 */
export declare function takeCoverage(session: inspector.Session): Promise<inspector.Profiler.TakePreciseCoverageReturnType>;
/**
 * Provide an inspector session as an argument. It will stop taking
 * precise coverage in the inspector
 * @param session
 */
export declare function stopCoverage(session: inspector.Session): Promise<void>;
