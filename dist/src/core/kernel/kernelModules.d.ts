/// <reference types="node" />
import { EventEmitter } from "events";
import { TestEnvironment } from "../configuration/testEnvironment";
import { CoverageModule } from "./modules/coverage/coverageModule";
import { MessageModule } from "./modules/messageModule/messageModule";
import { RepoManager } from "./modules/repoManager/repoManager";
import { RequestModule } from "./modules/requests/requestModule";
export declare class KernelModules {
    environment: TestEnvironment;
    messages: MessageModule;
    repoManager: RepoManager;
    events: EventEmitter;
    requests: RequestModule;
    coverage: CoverageModule;
    constructor(environment: TestEnvironment);
}
