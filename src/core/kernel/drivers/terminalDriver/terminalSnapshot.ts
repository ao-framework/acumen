import { eachValue } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError, throwExpection } from "../../../../commons/errorHandling";
import { iSnapshotSuite } from "../../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../../contracts/snapshots/model/iSnapshotTestInstance";
import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { translateResponse } from "../../../../translation/translate";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import { breadCrumbs, closeBracket, column, description, entityName, error, keyword, oneSpace, oneTab, openBracket } from "./terminalTheme";

export class TerminalSnapshot {

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

    public createRequest(entry: string): iDispatchRequestSnapshot {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@terminal",
            body: {},
            headers
        }
    }

    public update() {
        const entries = this.kernel.modules.repoManager.getEntries(this.terminalEnvironment.repo);
        entries.forEach(entry => {
            const messages = []
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then(response => {
                    response.whenSnapshot(snapshot => {
                        const lines = []
                        this.suite(snapshot.body.data.suite, lines);
                        this.kernel.modules.messages.info(this.terminalEnvironment, lines);
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                        if (this.terminalEnvironment.console.throwWhenErrorsPresent &&
                            snapshot.body.data.suite.containsFailures) {
                            throwExpection(`Snapshot Failed`)
                        }
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                        this.kernel.modules.messages.error(this.terminalEnvironment, error.body);
                    })
                }).catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    this.kernel.modules.messages.error(this.terminalEnvironment, splitError(err))
                })
        })
    }

    public suite(suite: iSnapshotSuite, lines: string[], space: string = "") {
        const inside = space + column(this.terminalEnvironment.console) + oneTab();
        const headerSegments: string[] = [
            keyword("@Suite"),
            entityName(suite.name),
            openBracket()
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
        description(lines, suite, inside);
        if (suite.controller) { this.doController(suite.controller, lines, inside) }
        eachValue(suite.tests, (test: iSnapshotTest) => this.test(test, lines, inside))
        eachValue(suite.suites, (suite: iSnapshotSuite) => this.suite(suite, lines, inside))
        lines.push(space + closeBracket())
        lines.push(space)
    }

    public doController(test: iSnapshotTest, lines: string[], space: string = "") {
        const inside = space + column(this.terminalEnvironment.console) + oneTab();
        const headerSegments = [
            `<cyan><bold>@Controller</bold></cyan>`,
            openBracket()
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
        description(lines, test, inside);
        breadCrumbs(lines, test.breadCrumbs, inside)
        test.instances.forEach(instance => this.testInstance(instance, lines, inside));
        lines.push(space + closeBracket());
        lines.push(space);
    }

    public test(test: iSnapshotTest, lines: string[], space: string = "") {
        const inside = space + column(this.terminalEnvironment.console) + oneTab();
        const headerSegments = [
            `<cyan><bold>@Test</bold></cyan>`,
            `<cyan>${test.command}</cyan>`,
            openBracket()
        ]
        const header = headerSegments.join(oneSpace());
        lines.push(space + header);
        description(lines, test, inside);
        breadCrumbs(lines, test.breadCrumbs, inside)
        test.instances.forEach(instance => this.testInstance(instance, lines, inside));
        lines.push(space + closeBracket());
        lines.push(space);
    }

    public testInstance(instance: iSnapshotTestInstance, lines: string[], space: string = "") {
        const inside = space + column(this.terminalEnvironment.console) + oneTab();
        const caller = (instance.callerSuiteName || "Acumen") + "@" + (instance.callerTestCommand || "controller");
        const benchmark = instance.time.toFixed(2) + "ms";
        const openBracketString = Array.isArray(instance.error) ? openBracket() : ""
        const closeBracketString = Array.isArray(instance.error) ? closeBracket() : ""
        const line = [
            `<gray>Caller:</gray> ${caller}`,
            `<gray>Benchmark:</gray> ${benchmark}`,
            `${openBracketString}`
        ]
        lines.push(space + line.join(" "))
        error(lines, instance.error, inside)
        lines.push(space + closeBracketString)
    }
}
