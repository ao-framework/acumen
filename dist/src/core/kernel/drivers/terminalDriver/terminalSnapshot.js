"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../../commons/coolKids");
const errorHandling_1 = require("../../../../commons/errorHandling");
const translate_1 = require("../../../../translation/translate");
const processor_1 = require("../../../processor/processor");
const terminalTheme_1 = require("./terminalTheme");
class TerminalSnapshot {
    constructor(kernel, terminalEnvironment) {
        this.kernel = kernel;
        this.terminalEnvironment = terminalEnvironment;
        this.entries = [];
    }
    controller() {
        this.getEntries();
        this.update();
    }
    getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.terminalEnvironment.repo);
    }
    createRequest(entry) {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@terminal",
            body: {},
            headers
        };
    }
    update() {
        const entries = this.kernel.modules.repoManager.getEntries(this.terminalEnvironment.repo);
        entries.forEach(entry => {
            const messages = [];
            processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then(response => {
                response.whenSnapshot(snapshot => {
                    const lines = [];
                    this.suite(snapshot.body.data.suite, lines);
                    this.kernel.modules.messages.info(this.terminalEnvironment, lines);
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    if (this.terminalEnvironment.console.throwWhenErrorsPresent &&
                        snapshot.body.data.suite.containsFailures) {
                        errorHandling_1.throwExpection(`Snapshot Failed`);
                    }
                });
                response.whenError(error => {
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    this.kernel.modules.messages.error(this.terminalEnvironment, error.body);
                });
            }).catch((err) => {
                errorHandling_1.stopProccessIfAcumenError(err);
                this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                this.kernel.modules.messages.error(this.terminalEnvironment, errorHandling_1.splitError(err));
            });
        });
    }
    suite(suite, lines, space = "") {
        const inside = space + terminalTheme_1.column(this.terminalEnvironment.console) + terminalTheme_1.oneTab();
        const headerSegments = [
            terminalTheme_1.keyword("@Suite"),
            terminalTheme_1.entityName(suite.name),
            terminalTheme_1.openBracket()
        ];
        const header = headerSegments.join(terminalTheme_1.oneSpace());
        lines.push(space + header);
        terminalTheme_1.description(lines, suite, inside);
        if (suite.controller) {
            this.doController(suite.controller, lines, inside);
        }
        coolKids_1.eachValue(suite.tests, (test) => this.test(test, lines, inside));
        coolKids_1.eachValue(suite.suites, (suite) => this.suite(suite, lines, inside));
        lines.push(space + terminalTheme_1.closeBracket());
        lines.push(space);
    }
    doController(test, lines, space = "") {
        const inside = space + terminalTheme_1.column(this.terminalEnvironment.console) + terminalTheme_1.oneTab();
        const headerSegments = [
            `<cyan><bold>@Controller</bold></cyan>`,
            terminalTheme_1.openBracket()
        ];
        const header = headerSegments.join(terminalTheme_1.oneSpace());
        lines.push(space + header);
        terminalTheme_1.description(lines, test, inside);
        terminalTheme_1.breadCrumbs(lines, test.breadCrumbs, inside);
        test.instances.forEach(instance => this.testInstance(instance, lines, inside));
        lines.push(space + terminalTheme_1.closeBracket());
        lines.push(space);
    }
    test(test, lines, space = "") {
        const inside = space + terminalTheme_1.column(this.terminalEnvironment.console) + terminalTheme_1.oneTab();
        const headerSegments = [
            `<cyan><bold>@Test</bold></cyan>`,
            `<cyan>${test.command}</cyan>`,
            terminalTheme_1.openBracket()
        ];
        const header = headerSegments.join(terminalTheme_1.oneSpace());
        lines.push(space + header);
        terminalTheme_1.description(lines, test, inside);
        terminalTheme_1.breadCrumbs(lines, test.breadCrumbs, inside);
        test.instances.forEach(instance => this.testInstance(instance, lines, inside));
        lines.push(space + terminalTheme_1.closeBracket());
        lines.push(space);
    }
    testInstance(instance, lines, space = "") {
        const inside = space + terminalTheme_1.column(this.terminalEnvironment.console) + terminalTheme_1.oneTab();
        const caller = (instance.callerSuiteName || "Acumen") + "@" + (instance.callerTestCommand || "controller");
        const benchmark = instance.time.toFixed(2) + "ms";
        const openBracketString = Array.isArray(instance.error) ? terminalTheme_1.openBracket() : "";
        const closeBracketString = Array.isArray(instance.error) ? terminalTheme_1.closeBracket() : "";
        const line = [
            `<gray>Caller:</gray> ${caller}`,
            `<gray>Benchmark:</gray> ${benchmark}`,
            `${openBracketString}`
        ];
        lines.push(space + line.join(" "));
        terminalTheme_1.error(lines, instance.error, inside);
        lines.push(space + closeBracketString);
    }
}
exports.TerminalSnapshot = TerminalSnapshot;
//# sourceMappingURL=terminalSnapshot.js.map