import { Suite } from "../../entryPoint/model/suite/suite";
import { iApparatusFunction } from "./iApparatusFunction";

export interface iTestOptions {
    command: string;
    description?: string;
    run?: iApparatusFunction;
    timeout?: number;
    suite: Suite;
}
