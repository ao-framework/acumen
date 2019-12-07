import { EnvironmentApi } from "../base/api/environmentApi";
import { ServerEnvironment } from "../serverEnvironment";

export class ServerEnvironmentApi extends EnvironmentApi<ServerEnvironment> {

    public port(port: number) {
        this.environment.port = port;
        return this;
    }

    public allowOverNetwork(use: boolean) {
        this.environment.allowOverNetwork = use;
        return this;
    }

    public useBrowserConsole() {
        this.environment.useBrowserConsole = true;
        return this;
    }

}
