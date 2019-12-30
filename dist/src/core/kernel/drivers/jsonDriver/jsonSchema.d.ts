import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { Kernel } from "../../kernel";
export declare class JsonSchema {
    private kernel;
    private jsonEnvironment;
    entries: string[];
    constructor(kernel: Kernel, jsonEnvironment: JsonEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSchema;
    update(): void;
}
