import { eachValue } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { iSchemaSuite } from "../../../../contracts/schema/model/iSchemaSuite";
import { iSchemaTest } from "../../../../contracts/schema/model/iSchemaTest";
import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { translateResponse } from "../../../../translation/translate";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import { closeBracket, column, entityName, keyword, oneSpace, oneTab, openBracket } from "./terminalTheme";

export class TerminalSchema {

    public entries: string[] = [];

    public constructor(
        private kernel: Kernel,
        private terminalEnvironment: TerminalEnvironment
    ) { }

    public controller() {
        this.getEntries();
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.terminalEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestSchema {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry)
        return {
            url: "/schema",
            userAgent: "@terminal",
            body: {},
            headers
        }
    }

    public update() {
        const entries = this.kernel.modules.repoManager.getEntries(this.terminalEnvironment.repo);
        entries.forEach(entry => {
            const messages: string[] = [];
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then(response => {
                    response.whenSchema(schema => {
                        const lines = [];
                        this.suite(schema.body.data.suite, lines);
                        this.kernel.modules.messages.info(this.terminalEnvironment, lines);
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                        this.kernel.modules.messages.error(this.terminalEnvironment, error.body);
                    })
                })
                .catch((err: Error) => {
                    stopProccessIfAcumenError(err)
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    this.kernel.modules.messages.error(this.terminalEnvironment, splitError(err))
                })
        })
    }

    public suite(suite: iSchemaSuite, lines: string[], space: string = "") {
        const inside = space + column(this.terminalEnvironment.console) + oneTab();
        const headerSegments = [
            keyword("@Suite"),
            entityName(suite.name),
            openBracket()
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
        if (suite.controller) { this.doController(suite.controller, lines, inside) }
        eachValue(suite.tests, (test: iSchemaTest) => this.test(test, lines, inside))
        eachValue(suite.suites, (suite: iSchemaSuite) => this.suite(suite, lines, inside))
        lines.push(space + closeBracket())
    }

    public doController(test: iSchemaTest, lines: string[], space: string = "") {
        const headerSegments = [
            keyword("@Controller"),
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
    }

    public test(test: iSchemaTest, lines: string[], space: string = "") {
        const headerSegments = [
            keyword("@Test"),
            entityName(test.command)
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
    }
}
