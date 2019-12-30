import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { KernelDriver } from "../../kernelDriver";
export declare class JsonDriver extends KernelDriver {
    controller(): void;
    loadJsonEnvironment(environment: JsonEnvironment): void;
}
