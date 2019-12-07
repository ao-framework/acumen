import { ConsoleEnvironmentApi } from "./api/consoleEnvironmentApi";
import { RepoEnvironmentApi } from "./api/repoEnvironmentApi";
import { Environment } from "./environment";

export class EnvironmentApi<Context extends Environment> {
    public constructor(protected environment: Context) { }
    public console = new ConsoleEnvironmentApi(this.environment.console)
    public repo = new RepoEnvironmentApi(this.environment.repo)
}
