import { Controller } from "../model/controller/controller";
import { State } from "../model/state/state";
import { Suite } from "../model/suite/suite";
import { Test } from "../model/test/test";
import { Spotlight } from "../model/testInstance/additions/spotlight";
import { Warning } from "../model/testInstance/additions/warning";
import { Runtime } from "./runtime";

export class RuntimeContainer {
    public suite: Suite;
    public caller: Test | Controller;
    public test: Test | Controller;
    public runtime: Runtime;
    public state: State;
    public spotlights: Spotlight[] = [];
    public warnings: Warning[] = [];
}
