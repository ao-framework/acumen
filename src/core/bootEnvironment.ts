import { TestEnvironment } from "./configuration/testEnvironment";
import { Kernel } from "./kernel/kernel";

export function bootEnvironment(environment: TestEnvironment) {
    const kernel = new Kernel();
    kernel.loadEnvirnoment(environment);
    kernel.execute();
}
