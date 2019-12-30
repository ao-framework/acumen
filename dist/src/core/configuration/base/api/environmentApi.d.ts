import { Environment } from "../environment";
import { ConsoleEnvironmentApi } from "./consoleEnvironmentApi";
import { RepoEnvironmentApi } from "./repoEnvironmentApi";
export declare class EnvironmentApi<Context extends Environment> {
    protected environment: Context;
    constructor(environment: Context);
    console: ConsoleEnvironmentApi;
    repo: RepoEnvironmentApi;
}
