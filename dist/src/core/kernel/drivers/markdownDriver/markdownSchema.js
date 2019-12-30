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
class MarkdownSchema {
    constructor(kernel, markdownEnvironment) {
        this.kernel = kernel;
        this.markdownEnvironment = markdownEnvironment;
        this.resourceCounter = {};
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
            url: "/schema",
            userAgent: "@markdown",
            body: {},
            headers
        };
    }
    update() {
        const pages = [];
        const promises = this.entries.map(entry => {
            const messages = [];
            return processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then((response) => {
                response.whenSchema((schema) => {
                    this.markdownEnvironment.schemaOptions.path;
                    let lines = [];
                    theme.h2(lines, entry);
                    this.loadSuite(lines, schema.body.data.suite);
                    lines = filters_1.filterLines(lines);
                    coolKids_1.whenFunction(this.markdownEnvironment.schemaOptions.contentsHandler)(lines);
                    pages.push(lines);
                });
            }).catch((err) => {
                errorHandling_1.stopProccessIfAcumenError(err);
                this.kernel.modules.messages.verbose(this.markdownEnvironment, messages);
                this.kernel.modules.messages.error(this.markdownEnvironment, errorHandling_1.splitError(err));
            });
        });
        Promise.all(promises)
            .then(() => {
            if (validators_1.isString(this.markdownEnvironment.schemaOptions.path)) {
                const lines = [];
                pages.forEach(page => page.forEach(line => lines.push(line)));
                fs_1.writeFileSync(this.markdownEnvironment.schemaOptions.path, lines.join("\n"), "utf8");
            }
        });
    }
    loadSuite(lines, suite, space = "") {
        const treeLines = [];
        const documentationLines = [];
        this.loadSuiteForTree(treeLines, suite, this.resourceCounter);
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
        theme.item(lines, `${theme.highlight("Suite")} [${suite.name}](${this.getResourceLink(resourceCounter, suite.name)})`, space);
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
        theme.code(lines, "js", test.functionCode);
    }
}
exports.MarkdownSchema = MarkdownSchema;
//# sourceMappingURL=markdownSchema.js.map