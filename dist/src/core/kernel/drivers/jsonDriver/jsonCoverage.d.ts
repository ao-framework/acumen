import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { Kernel } from "../../kernel";
export declare class JsonCoverage {
    private kernel;
    private jsonEnvironment;
    entries: string[];
    coverageOptions: iCoverageOptions;
    constructor(kernel: Kernel, jsonEnvironment: JsonEnvironment);
    controller(): void;
    getEntries(): void;
    getCoverageOptions(): void;
    createRequest(entry: string): iDispatchRequestCoverage;
    update(): void;
}
