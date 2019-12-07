import { performance } from "perf_hooks";

import { iVariableDiagram } from "../../../contracts/base/iVariableDiagram";
import { Controller } from "../controller/controller";
import { Test } from "../test/test";
import { Spotlight } from "./additions/spotlight";
import { Warning } from "./additions/warning";
import * as testInstanceLogic from "./testInstanceLogic";

export abstract class TestInstance {

    /**
     * The id of the instance
     */
    public id: string;

    /**
     * The type of the instance
     */
    public type: "success" | "failure" | "stub";

    /**
     * The test that this is an instance of
     */
    public test: Test;

    /**
     * The controller / test that called this particular instance
     */
    public caller: Test | Controller;

    /**
     * The spotlight items created while this instance ran
     */
    public spotlights: Spotlight[] = [];

    /**
     * The warning items create while this instance ran
     */
    public warnings: Warning[] = [];

    /**
     * The arguments passed to this instance
     */
    public args: iVariableDiagram[] = [];

    /**
     * When this instance started in time
     */
    public start: number;

    /**
     * When this instance ended in time
     */
    public end: number;

    /**
     * The difference between end and start
     */
    public time: number;

    /**
     * The error stack trace as an error for east transport
     */
    public error?: string[]

    /**
     * The name of every level up till this point
     */
    public breadCrumbs: string[] = []


    /**
     * Holds the log entries from the runtime
     */
    public log: string[] = [];

    /**
     * Static logic that pertains to the concept of the test instance
     */
    static logic = testInstanceLogic

    /**
     * Helper method to end the benchmark and set the time
     */
    public endBenchmark() {
        this.end = performance.now();
        this.time = this.end - this.start;
    }
}
