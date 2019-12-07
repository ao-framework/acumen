import { Environment } from "../environment";
import { ConsoleEnvironmentApi } from "./consoleEnvironmentApi";
import { RepoEnvironmentApi } from "./repoEnvironmentApi";

export class EnvironmentApi<Context extends Environment> {
    public constructor(protected environment: Context) { }
    public console = new ConsoleEnvironmentApi(this.environment.console)
    public repo = new RepoEnvironmentApi(this.environment.repo)
}
