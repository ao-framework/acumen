import { TestEnvironment } from "../configuration/testEnvironment";
import { JsonDriver } from "./drivers/jsonDriver/jsonDriver";
import { MarkdownDriver } from "./drivers/markdownDriver/markdownDriver";
import { ServerDriver } from "./drivers/serverDriver/serverDriver";
import { TerminalDriver } from "./drivers/terminalDriver/terminalDriver";
import { KernelModules } from "./kernelModules";
export declare class Kernel {
    modules: KernelModules;
    environment: TestEnvironment;
    json: JsonDriver;
    server: ServerDriver;
    terminal: TerminalDriver;
    markdownDriver: MarkdownDriver;
    constructor();
    loadEnvirnoment(environment: TestEnvironment): void;
    execute(): void;
}
