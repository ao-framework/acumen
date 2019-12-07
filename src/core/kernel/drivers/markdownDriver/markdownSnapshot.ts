import { writeFileSync } from "fs";

import { eachValue, whenFunction } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { isString, stringHasLength } from "../../../../commons/validators";
import { iKeyValuePair } from "../../../../contracts/base/iKeyValuePair";
import { iSnapshotSuite } from "../../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../../contracts/snapshots/model/iSnapshotTestInstance";
import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { translateResponse } from "../../../../translation/translate";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { filterLines } from "../../../processor/filters";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import * as theme from "./markdownTheme";

type iResourceCounter = iKeyValuePair<number>;

export class MarkdownSnapshot {

    public entries: string[] = [];

    public constructor(
        private kernel: Kernel,
        private markdownEnvironment: MarkdownEnvironment
    ) { }

    public controller() {
        this.getEntries();
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.markdownEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestSnapshot {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@markdown",
            body: {},
            headers
        }
    }

    public update() {
        // #later all entries into one file??
        this.entries.forEach(entry => {
            const messages = []
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then((response) => {
                    response.whenSnapshot((snapshot) => {
                        let lines: string[] = [];
                        this.loadSuite(lines, snapshot.body.data.suite, entry);
                        if (isString(this.markdownEnvironment.snapshotOptions.path)) {
                            lines = filterLines(lines)
                            whenFunction(this.markdownEnvironment.snapshotOptions.contentsHandler)(lines);
                            writeFileSync(this.markdownEnvironment.snapshotOptions.path, lines.join("\n"), "utf8");
                        }
                    })
                }).catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.markdownEnvironment, messages);
                    this.kernel.modules.messages.error(this.markdownEnvironment, splitError(err))
                })
        })
    }

    public loadSuite(lines: string[], suite: iSnapshotSuite, entry: string) {
        theme.h2(lines, entry);
        if (suite.containsFailures) {
            lines.push(`<img src="https://img.shields.io/badge/Snapshot-Failed-red" />`)
            lines.push("")
        } else {
            lines.push(`<img src="https://img.shields.io/badge/Snapshot-Passed-green" />`)
            lines.push("")
        }
        const treeLines: string[] = [];
        const documentationLines: string[] = [];
        const resourceCounter: iResourceCounter = {};
        this.loadSuiteForTree(treeLines, suite, resourceCounter)
        this.loadSuiteForDocumentation(documentationLines, suite);
        lines.push(...treeLines)
        lines.push(theme.oneSpace())
        lines.push(theme.oneSpace())
        lines.push(...documentationLines)
    }

    public getResourceLink(resourceCounter: iResourceCounter, name: string) {
        if (resourceCounter[name] === undefined) {
            resourceCounter[name] = 0;
            return "#" + name;
        } else {
            resourceCounter[name]++;
            return "#" + name + "-" + resourceCounter[name];
        }
    }

    public loadSuiteForTree(lines: string[], suite: iSnapshotSuite, resourceCounter: iResourceCounter, space: string = "") {
        const inside = space + theme.oneTab();
        const errorFlag = suite.containsFailures ? "!! " : " "
        theme.item(lines, `${theme.highlight(errorFlag + "Suite")} [${suite.name}](${this.getResourceLink(resourceCounter, suite.name)})`, space)
        if (suite.controller) { this.loadTestForTree(lines, suite.controller, resourceCounter, inside) }
        eachValue(suite.tests, (test: iSnapshotTest) => this.loadTestForTree(lines, test, resourceCounter, inside))
        eachValue(suite.suites, (suite: iSnapshotSuite) => this.loadSuiteForTree(lines, suite, resourceCounter, inside))
    }

    public loadTestForTree(lines: string[], test: iSnapshotTest, resourceCounter: iResourceCounter, space: string = "") {
        theme.item(lines, `${theme.highlight("Test")} [${test.command}](${this.getResourceLink(resourceCounter, test.command)})`, space)
    }

    public loadSuiteForDocumentation(lines: string[], suite: iSnapshotSuite, space: string = "") {
        theme.h3(lines, suite.name)
        lines.push("-----------")
        if (suite.controller) { this.loadTestForDocumentation(lines, suite.controller) }
        eachValue(suite.tests, (test: iSnapshotTest) => this.loadTestForDocumentation(lines, test))
        eachValue(suite.suites, (suite: iSnapshotSuite) => this.loadSuiteForDocumentation(lines, suite))
    }

    public loadTestForDocumentation(lines: string[], test: iSnapshotTest) {
        theme.h4(lines, test.command)
        if (stringHasLength(test.description)) {
            theme.blockquote(lines, test.description)
        } else {
            theme.blockquote(lines, "No description is provided at this time.")
        }
        test.instances.forEach((instance, index) => this.loadTestInstanceForDocumentation(lines, instance, index + 1))
    }

    public loadTestInstanceForDocumentation(lines: string[], instance: iSnapshotTestInstance, count: number) {
        const callerSuite = instance.callerSuiteName ? instance.callerSuiteName : "Acumen"
        const callerTestCommand = instance.callerTestCommand ? instance.callerTestCommand : "controller";
        const caller = theme.highlight(`${callerSuite}@${callerTestCommand}`);
        if (instance.type === "success") {
            lines.push(`${count}. ${theme.highlight("Success")} from: ${caller}`)
        }
        if (instance.type === "failure") {
            lines.push(`${count}. ${theme.highlight("Failure")} from: ${caller}`)
        }
    }

}
