import { JsonEnvironment } from "./jsonEnvironment";
import { MarkdownEnvironment } from "./markdownEnvironment";
import { ServerEnvironment } from "./serverEnvironment";
import { TerminalEnvironment } from "./terminalEnvironment";

export class TestEnvironment {
    public serverEnvironments: ServerEnvironment[] = [];
    public jsonEnvironments: JsonEnvironment[] = [];
    public markdownEnvironments: MarkdownEnvironment[] = [];
    public terminalEnvironments: TerminalEnvironment[] = []
}
