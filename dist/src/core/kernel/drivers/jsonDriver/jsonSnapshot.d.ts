import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { Kernel } from "../../kernel";
export declare class JsonSnapshot {
    private kernel;
    private jsonEnvironment;
    entries: string[];
    constructor(kernel: Kernel, jsonEnvironment: JsonEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSnapshot;
    update(): void;
}
