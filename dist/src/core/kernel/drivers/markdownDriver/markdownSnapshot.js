"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const coolKids_1 = require("../../../../commons/coolKids");
const errorHandling_1 = require("../../../../commons/errorHandling");
const validators_1 = require("../../../../commons/validators");
const translate_1 = require("../../../../translation/translate");
const filters_1 = require("../../../processor/filters");
const processor_1 = require("../../../processor/processor");
const theme = tslib_1.__importStar(require("./markdownTheme"));
class MarkdownSnapshot {
    constructor(kernel, markdownEnvironment) {
        this.kernel = kernel;
        this.markdownEnvironment = markdownEnvironment;
        this.entries = [];
    }
    controller() {
        this.getEntries();
        this.update();
    }
    getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.markdownEnvironment.repo);
    }
    createRequest(entry) {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@markdown",
            body: {},
            headers
        };
    }
    update() {
        // #later all entries into one file??
        this.entries.forEach(entry => {
            const messages = [];
            processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then((response) => {
                response.whenSnapshot((snapshot) => {
                    let lines = [];
                    this.loadSuite(lines, snapshot.body.data.suite, entry);
                    if (validators_1.isString(this.markdownEnvironment.snapshotOptions.path)) {
                        lines = filters_1.filterLines(lines);
                        coolKids_1.whenFunction(this.markdownEnvironment.snapshotOptions.contentsHandler)(lines);
                        fs_1.writeFileSync(this.markdownEnvironment.snapshotOptions.path, lines.join("\n"), "utf8");
                    }
                });
            }).catch((err) => {
                errorHandling_1.stopProccessIfAcumenError(err);
                this.kernel.modules.messages.verbose(this.markdownEnvironment, messages);
                this.kernel.modules.messages.error(this.markdownEnvironment, errorHandling_1.splitError(err));
            });
        });
    }
    loadSuite(lines, suite, entry) {
        theme.h2(lines, entry);
        if (suite.containsFailures) {
            lines.push(`<img src="https://img.shields.io/badge/Snapshot-Failed-red" />`);
            lines.push("");
        }
        else {
            lines.push(`<img src="https://img.shields.io/badge/Snapshot-Passed-green" />`);
            lines.push("");
        }
        const treeLines = [];
        const documentationLines = [];
        const resourceCounter = {};
        this.loadSuiteForTree(treeLines, suite, resourceCounter);
        this.loadSuiteForDocumentation(documentationLines, suite);
        lines.push(...treeLines);
        lines.push(theme.oneSpace());
        lines.push(theme.oneSpace());
        lines.push(...documentationLines);
    }
    getResourceLink(resourceCounter, name) {
        if (resourceCounter[name] === undefined) {
            resourceCounter[name] = 0;
            return "#" + name;
        }
        else {
            resourceCounter[name]++;
            return "#" + name + "-" + resourceCounter[name];
        }
    }
    loadSuiteForTree(lines, suite, resourceCounter, space = "") {
        const inside = space + theme.oneTab();
        const errorFlag = suite.containsFailures ? "!! " : " ";
        theme.item(lines, `${theme.highlight(errorFlag + "Suite")} [${suite.name}](${this.getResourceLink(resourceCounter, suite.name)})`, space);
        if (suite.controller) {
            this.loadTestForTree(lines, suite.controller, resourceCounter, inside);
        }
        coolKids_1.eachValue(suite.tests, (test) => this.loadTestForTree(lines, test, resourceCounter, inside));
        coolKids_1.eachValue(suite.suites, (suite) => this.loadSuiteForTree(lines, suite, resourceCounter, inside));
    }
    loadTestForTree(lines, test, resourceCounter, space = "") {
        theme.item(lines, `${theme.highlight("Test")} [${test.command}](${this.getResourceLink(resourceCounter, test.command)})`, space);
    }
    loadSuiteForDocumentation(lines, suite, space = "") {
        theme.h3(lines, suite.name);
        lines.push("-----------");
        if (suite.controller) {
            this.loadTestForDocumentation(lines, suite.controller);
        }
        coolKids_1.eachValue(suite.tests, (test) => this.loadTestForDocumentation(lines, test));
        coolKids_1.eachValue(suite.suites, (suite) => this.loadSuiteForDocumentation(lines, suite));
    }
    loadTestForDocumentation(lines, test) {
        theme.h4(lines, test.command);
        if (validators_1.stringHasLength(test.description)) {
            theme.blockquote(lines, test.description);
        }
        else {
            theme.blockquote(lines, "No description is provided at this time.");
        }
        test.instances.forEach((instance, index) => this.loadTestInstanceForDocumentation(lines, instance, index + 1));
    }
    loadTestInstanceForDocumentation(lines, instance, count) {
        const callerSuite = instance.callerSuiteName ? instance.callerSuiteName : "Acumen";
        const callerTestCommand = instance.callerTestCommand ? instance.callerTestCommand : "controller";
        const caller = theme.highlight(`${callerSuite}@${callerTestCommand}`);
        if (instance.type === "success") {
            lines.push(`${count}. ${theme.highlight("Success")} from: ${caller}`);
        }
        if (instance.type === "failure") {
            lines.push(`${count}. ${theme.highlight("Failure")} from: ${caller}`);
        }
    }
}
exports.MarkdownSnapshot = MarkdownSnapshot;
//# sourceMappingURL=markdownSnapshot.js.map