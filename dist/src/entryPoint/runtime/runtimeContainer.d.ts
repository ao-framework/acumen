import { Controller } from "../model/controller/controller";
import { State } from "../model/state/state";
import { Suite } from "../model/suite/suite";
import { Test } from "../model/test/test";
import { Spotlight } from "../model/testInstance/additions/spotlight";
import { Warning } from "../model/testInstance/additions/warning";
import { Runtime } from "./runtime";
export declare class RuntimeContainer {
    suite: Suite;
    caller: Test | Controller;
    test: Test | Controller;
    runtime: Runtime;
    state: State;
    spotlights: Spotlight[];
    warnings: Warning[];
}
