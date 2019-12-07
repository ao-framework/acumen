import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { KernelDriver } from "../../kernelDriver";
import { AcumenServer } from "./acumenServer";

export class ServerDriver extends KernelDriver {
    public controller() {
        this.environment.serverEnvironments
            .forEach(environment => this.loadServerEnvironment(environment))
    }

    public loadServerEnvironment(serverEnvironment: ServerEnvironment) {
        const server = new AcumenServer(this.kernel, serverEnvironment);
        server.setupServer()
    }
}
