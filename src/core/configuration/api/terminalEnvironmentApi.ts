import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { EnvironmentApi } from "../base/api/environmentApi";
import { TerminalEnvironment } from "../terminalEnvironment";

export class TerminalEnvironmentApi extends EnvironmentApi<TerminalEnvironment>{

    public snapshot() {
        this.environment.transformers.push("snapshot");
        return this;
    }

    public schema() {
        this.environment.transformers.push("schema");
        return this;
    }

    public coverage(options?: iCoverageOptions) {
        this.environment.transformers.push("coverage");
        this.environment.repo.coverageOptions = options;
        return this;
    }
}
