import { ConsoleEnvironment } from "./consoleEnvironment";
import { RepoEnvironment } from "./repoEnvironment";

export class Environment {
    public console: ConsoleEnvironment = new ConsoleEnvironment()
    public repo: RepoEnvironment = new RepoEnvironment();
}
