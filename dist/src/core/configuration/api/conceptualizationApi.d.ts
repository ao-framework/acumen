import { TestEnvironment } from "../testEnvironment";
import { JsonEnvironmentApi } from "./jsonEnvironmentApi";
import { MarkdownEnvironmentApi } from "./markdownEnvironmentApi";
import { ServerEnvironmentApi } from "./serverEnvironmentApi";
import { TerminalEnvironmentApi } from "./terminalEnvironmentApi";
export declare class ConceptualizationApi {
    constructor(ev: TestEnvironment);
    getEnvironment(): TestEnvironment;
    terminalEnvironment(handler: (terminal: TerminalEnvironmentApi) => any): this;
    jsonEnvironment(handler: (json: JsonEnvironmentApi) => any): this;
    serverEnvironment(handler: (server: ServerEnvironmentApi) => any): this;
    markdownEnvironment(handler: (markdown: MarkdownEnvironmentApi) => any): this;
}
export declare function conceptualize(ev: TestEnvironment): ConceptualizationApi;
