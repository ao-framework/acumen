import { EnvironmentApi } from "../base/api/environmentApi";
import { ServerEnvironment } from "../serverEnvironment";
export declare class ServerEnvironmentApi extends EnvironmentApi<ServerEnvironment> {
    port(port: number): this;
    allowOverNetwork(use: boolean): this;
    useBrowserConsole(): this;
}
