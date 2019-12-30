import { iKeyValuePair } from "../../../../contracts/base/iKeyValuePair";
import { iSchemaSuite } from "../../../../contracts/schema/model/iSchemaSuite";
import { iSchemaTest } from "../../../../contracts/schema/model/iSchemaTest";
import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { Kernel } from "../../kernel";
declare type iResourceCounter = iKeyValuePair<number>;
export declare class MarkdownSchema {
    private kernel;
    private markdownEnvironment;
    resourceCounter: iResourceCounter;
    entries: string[];
    constructor(kernel: Kernel, markdownEnvironment: MarkdownEnvironment);
    controller(): void;
    getEntries(): void;
    createRequest(entry: string): iDispatchRequestSchema;
    update(): void;
    loadSuite(lines: string[], suite: iSchemaSuite, space?: string): void;
    getResourceLink(resourceCounter: iResourceCounter, name: string): string;
    loadSuiteForTree(lines: string[], suite: iSchemaSuite, resourceCounter: iResourceCounter, space?: string): void;
    loadTestForTree(lines: string[], test: iSchemaTest, resourceCounter: iResourceCounter, space?: string): void;
    loadSuiteForDocumentation(lines: string[], suite: iSchemaSuite, space?: string): void;
    loadTestForDocumentation(lines: string[], test: iSchemaTest): void;
}
export {};
