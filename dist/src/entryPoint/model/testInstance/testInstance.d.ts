import { iVariableDiagram } from "../../../contracts/base/iVariableDiagram";
import { Controller } from "../controller/controller";
import { Test } from "../test/test";
import { Spotlight } from "./additions/spotlight";
import { Warning } from "./additions/warning";
import * as testInstanceLogic from "./testInstanceLogic";
export declare abstract class TestInstance {
    /**
     * The id of the instance
     */
    id: string;
    /**
     * The type of the instance
     */
    type: "success" | "failure" | "stub";
    /**
     * The test that this is an instance of
     */
    test: Test;
    /**
     * The controller / test that called this particular instance
     */
    caller: Test | Controller;
    /**
     * The spotlight items created while this instance ran
     */
    spotlights: Spotlight[];
    /**
     * The warning items create while this instance ran
     */
    warnings: Warning[];
    /**
     * The arguments passed to this instance
     */
    args: iVariableDiagram[];
    /**
     * When this instance started in time
     */
    start: number;
    /**
     * When this instance ended in time
     */
    end: number;
    /**
     * The difference between end and start
     */
    time: number;
    /**
     * The error stack trace as an error for east transport
     */
    error?: string[];
    /**
     * The name of every level up till this point
     */
    breadCrumbs: string[];
    /**
     * Holds the log entries from the runtime
     */
    log: string[];
    /**
     * Static logic that pertains to the concept of the test instance
     */
    static logic: typeof testInstanceLogic;
    /**
     * Helper method to end the benchmark and set the time
     */
    endBenchmark(): void;
}
