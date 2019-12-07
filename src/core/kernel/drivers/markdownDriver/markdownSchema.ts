import { writeFileSync } from "fs";

import { eachValue, whenFunction } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { isString, stringHasLength } from "../../../../commons/validators";
import { iKeyValuePair } from "../../../../contracts/base/iKeyValuePair";
import { iSchemaSuite } from "../../../../contracts/schema/model/iSchemaSuite";
import { iSchemaTest } from "../../../../contracts/schema/model/iSchemaTest";
import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { translateResponse } from "../../../../translation/translate";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { filterLines } from "../../../processor/filters";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import * as theme from "./markdownTheme";

type iResourceCounter = iKeyValuePair<number>;

export class MarkdownSchema {

    public resourceCounter: iResourceCounter = {};
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

    public createRequest(entry: string): iDispatchRequestSchema {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/schema",
            userAgent: "@markdown",
            body: {},
            headers
        }
    }

    public update() {
        const pages: string[][] = [];
        const promises = this.entries.map(entry => {
            const messages = []
            return callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then((response) => {
                    response.whenSchema((schema) => {
                        this.markdownEnvironment.schemaOptions.path
                        let lines: string[] = [];
                        theme.h2(lines, entry);
                        this.loadSuite(lines, schema.body.data.suite);
                        lines = filterLines(lines)
                        whenFunction(this.markdownEnvironment.schemaOptions.contentsHandler)(lines);
                        pages.push(lines)
                    })
                }).catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.markdownEnvironment, messages);
                    this.kernel.modules.messages.error(this.markdownEnvironment, splitError(err))
                })
        })
        Promise.all(promises)
            .then(() => {
                if (isString(this.markdownEnvironment.schemaOptions.path)) {
                    const lines = [];
                    pages.forEach(page => page.forEach(line => lines.push(line)));
                    writeFileSync(this.markdownEnvironment.schemaOptions.path, lines.join("\n"), "utf8");
                }
            })
    }

    public loadSuite(lines: string[], suite: iSchemaSuite, space: string = "") {
        const treeLines: string[] = [];
        const documentationLines: string[] = [];

        this.loadSuiteForTree(treeLines, suite, this.resourceCounter)
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

    public loadSuiteForTree(lines: string[], suite: iSchemaSuite, resourceCounter: iResourceCounter, space: string = "") {
        const inside = space + theme.oneTab();
        theme.item(lines, `${theme.highlight("Suite")} [${suite.name}](${this.getResourceLink(resourceCounter, suite.name)})`, space)
        if (suite.controller) { this.loadTestForTree(lines, suite.controller, resourceCounter, inside) }
        eachValue(suite.tests, (test: iSchemaTest) => this.loadTestForTree(lines, test, resourceCounter, inside))
        eachValue(suite.suites, (suite: iSchemaSuite) => this.loadSuiteForTree(lines, suite, resourceCounter, inside))
    }

    public loadTestForTree(lines: string[], test: iSchemaTest, resourceCounter: iResourceCounter, space: string = "") {
        theme.item(lines, `${theme.highlight("Test")} [${test.command}](${this.getResourceLink(resourceCounter, test.command)})`, space)
    }

    public loadSuiteForDocumentation(lines: string[], suite: iSchemaSuite, space: string = "") {
        theme.h3(lines, suite.name)
        lines.push("-----------")
        if (suite.controller) { this.loadTestForDocumentation(lines, suite.controller) }
        eachValue(suite.tests, (test: iSchemaTest) => this.loadTestForDocumentation(lines, test))
        eachValue(suite.suites, (suite: iSchemaSuite) => this.loadSuiteForDocumentation(lines, suite))
    }

    public loadTestForDocumentation(lines: string[], test: iSchemaTest) {
        theme.h4(lines, test.command)
        if (stringHasLength(test.description)) {
            theme.blockquote(lines, test.description)
        } else {
            theme.blockquote(lines, "No description is provided at this time.")
        }
        theme.code(lines, "js", test.functionCode);
    }

}
