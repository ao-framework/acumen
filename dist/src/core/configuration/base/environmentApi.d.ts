import { ConsoleEnvironmentApi } from "./api/consoleEnvironmentApi";
import { RepoEnvironmentApi } from "./api/repoEnvironmentApi";
import { Environment } from "./environment";
export declare class EnvironmentApi<Context extends Environment> {
    protected environment: Context;
    constructor(environment: Context);
    console: ConsoleEnvironmentApi;
    repo: RepoEnvironmentApi;
}
