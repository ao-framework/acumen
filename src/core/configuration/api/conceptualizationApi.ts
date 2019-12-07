import { JsonEnvironment } from "../jsonEnvironment";
import { MarkdownEnvironment } from "../markdownEnvironment";
import { ServerEnvironment } from "../serverEnvironment";
import { TerminalEnvironment } from "../terminalEnvironment";
import { TestEnvironment } from "../testEnvironment";
import { JsonEnvironmentApi } from "./jsonEnvironmentApi";
import { MarkdownEnvironmentApi } from "./markdownEnvironmentApi";
import { ServerEnvironmentApi } from "./serverEnvironmentApi";
import { TerminalEnvironmentApi } from "./terminalEnvironmentApi";

const evs = new WeakMap<ConceptualizationApi, TestEnvironment>()

export class ConceptualizationApi {

    public constructor(ev: TestEnvironment) {
        evs.set(this, ev);
    }

    public getEnvironment() {
        return evs.get(this);
    }

    public terminalEnvironment(handler: (terminal: TerminalEnvironmentApi) => any) {
        const terminal = new TerminalEnvironment()
        evs.get(this).terminalEnvironments.push(terminal);
        handler(new TerminalEnvironmentApi(terminal))
        return this;
    }

    public jsonEnvironment(handler: (json: JsonEnvironmentApi) => any) {
        const json = new JsonEnvironment()
        evs.get(this).jsonEnvironments.push(json);
        handler(new JsonEnvironmentApi(json));
        return this;
    }

    public serverEnvironment(handler: (server: ServerEnvironmentApi) => any) {
        const server = new ServerEnvironment();
        evs.get(this).serverEnvironments.push(server);
        handler(new ServerEnvironmentApi(server))
        return this;
    }

    public markdownEnvironment(handler: (markdown: MarkdownEnvironmentApi) => any) {
        const markdown = new MarkdownEnvironment()
        evs.get(this).markdownEnvironments.push(markdown);
        handler(new MarkdownEnvironmentApi(markdown))
        return this;
    }
}

export function conceptualize(ev: TestEnvironment) {
    return new ConceptualizationApi(ev);
}
