import { TestEnvironment } from "../configuration/testEnvironment";
import { Kernel } from "./kernel";
export declare class KernelDriver {
    protected environment: TestEnvironment;
    protected kernel: Kernel;
    loadKernel(kernel: Kernel): this;
    loadEnvironment(environment: TestEnvironment): this;
    controller(): void;
    update(): void;
}
