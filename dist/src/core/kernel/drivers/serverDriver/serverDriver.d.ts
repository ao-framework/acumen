import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { KernelDriver } from "../../kernelDriver";
export declare class ServerDriver extends KernelDriver {
    controller(): void;
    loadServerEnvironment(serverEnvironment: ServerEnvironment): void;
}
