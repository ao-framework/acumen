import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { Kernel } from "../../kernel";
export declare class TerminalCoverage {
    private kernel;
    private terminalEnvironment;
    entries: string[];
    coverageOptions: iCoverageOptions;
    constructor(kernel: Kernel, terminalEnvironment: TerminalEnvironment);
    controller(): void;
    getEntries(): void;
    getCoverageOptions(): void;
    createRequest(entry: string): iDispatchRequestCoverage;
    update(): void;
    writeFooter(lines: string[], coverage: iCoverageResponseData): void;
    writeToLines(files: iCoverageTableFormat[]): {
        lines: any[];
        shouldThrow: false;
    };
}
