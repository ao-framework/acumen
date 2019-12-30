import { iCoverageOptions } from "../../../contracts/coverage/request/iCoverageOptions";
import { EnvironmentApi } from "../base/api/environmentApi";
import { TerminalEnvironment } from "../terminalEnvironment";
export declare class TerminalEnvironmentApi extends EnvironmentApi<TerminalEnvironment> {
    snapshot(): this;
    schema(): this;
    coverage(options?: iCoverageOptions): this;
}
