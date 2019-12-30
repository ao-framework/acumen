import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { KernelDriver } from "../../kernelDriver";
export declare class TerminalDriver extends KernelDriver {
    controller(): void;
    loadTerminalEnvironment(terminal: TerminalEnvironment): void;
}
