import { TestEnvironment } from "../configuration/testEnvironment";
import { JsonDriver } from "./drivers/jsonDriver/jsonDriver";
import { MarkdownDriver } from "./drivers/markdownDriver/markdownDriver";
import { ServerDriver } from "./drivers/serverDriver/serverDriver";
import { TerminalDriver } from "./drivers/terminalDriver/terminalDriver";
import { KernelModules } from "./kernelModules";

export class Kernel {
    public modules: KernelModules;
    public environment: TestEnvironment;
    public json: JsonDriver = new JsonDriver()
    public server: ServerDriver = new ServerDriver();
    public terminal: TerminalDriver = new TerminalDriver();
    public markdownDriver: MarkdownDriver = new MarkdownDriver();

    public constructor() {
        this.json.loadKernel(this);
        this.server.loadKernel(this);
        this.terminal.loadKernel(this);
        this.markdownDriver.loadKernel(this);
    }

    public loadEnvirnoment(environment: TestEnvironment) {
        this.environment = environment;
        this.modules = new KernelModules(environment);
        this.json.loadEnvironment(environment);
        this.server.loadEnvironment(environment);
        this.terminal.loadEnvironment(environment);
        this.markdownDriver.loadEnvironment(environment);
    }

    public execute() {
        this.json.controller();
        this.server.controller();
        this.terminal.controller()
        this.markdownDriver.controller();
    }
}
