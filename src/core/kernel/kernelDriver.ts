import { TestEnvironment } from "../configuration/testEnvironment";
import { Kernel } from "./kernel";

export class KernelDriver {

    protected environment: TestEnvironment;

    protected kernel: Kernel;

    public loadKernel(kernel: Kernel) {
        this.kernel = kernel;
        return this;
    }

    public loadEnvironment(environment: TestEnvironment) {
        this.environment = environment;
        return this;
    }

    public controller() {
        throw new Error("Not implemented");
    }

    public update() {
        throw new Error("Not implemented")
    }
}
