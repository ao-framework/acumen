import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { Kernel } from "../../kernel";
export declare class MarkdownCoverage {
    private kernel;
    private markdownEnvironment;
    entries: string[];
    coverageOptions: iCoverageOptions;
    constructor(kernel: Kernel, markdownEnvironment: MarkdownEnvironment);
    controller(): void;
    getEntries(): void;
    getCoverageOptions(): void;
    createRequest(entry: string): iDispatchRequestCoverage;
    update(): void;
    writeHeader(lines: string[], entry: string, shouldThrow: boolean): void;
    writeChart(lines: string[], data: iCoverageResponseData): void;
    writeToLines(files: iCoverageTableFormat[]): {
        lines: string[];
        shouldThrow: false;
    };
}
