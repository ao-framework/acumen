import { JsonEnvironment } from "./jsonEnvironment";
import { MarkdownEnvironment } from "./markdownEnvironment";
import { ServerEnvironment } from "./serverEnvironment";
import { TerminalEnvironment } from "./terminalEnvironment";
export declare class TestEnvironment {
    serverEnvironments: ServerEnvironment[];
    jsonEnvironments: JsonEnvironment[];
    markdownEnvironments: MarkdownEnvironment[];
    terminalEnvironments: TerminalEnvironment[];
}
