import { iSchemaSuite } from "../../../../contracts/schema/model/iSchemaSuite";
import { iSchemaTest } from "../../../../contracts/schema/model/iSchemaTest";
import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { Kernel } from "../../kernel";
export declare class TerminalSchema {
    private kernel;
    private terminalEnvironment;
    entries: string[];
    constructor(kernel: Kernel, terminalEnvironment: TerminalEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSchema;
    update(): void;
    suite(suite: iSchemaSuite, lines: string[], space?: string): void;
    doController(test: iSchemaTest, lines: string[], space?: string): void;
    test(test: iSchemaTest, lines: string[], space?: string): void;
}
