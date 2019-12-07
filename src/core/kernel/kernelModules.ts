import { EventEmitter } from "events";

import { TestEnvironment } from "../configuration/testEnvironment";
import { CoverageModule } from "./modules/coverage/coverageModule";
import { MessageModule } from "./modules/messageModule/messageModule";
import { RepoManager } from "./modules/repoManager/repoManager";
import { RequestModule } from "./modules/requests/requestModule";

export class KernelModules {
    public messages: MessageModule = new MessageModule(this)
    public repoManager: RepoManager = new RepoManager(this);
    public events: EventEmitter = new EventEmitter();
    public requests: RequestModule = new RequestModule(this);
    public coverage: CoverageModule = new CoverageModule(this);
    public constructor(public environment: TestEnvironment) { }
}
