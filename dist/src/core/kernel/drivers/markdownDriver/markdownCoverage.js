"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const coolKids_1 = require("../../../../commons/coolKids");
const validators_1 = require("../../../../commons/validators");
const translate_1 = require("../../../../translation/translate");
const filters_1 = require("../../../processor/filters");
const processor_1 = require("../../../processor/processor");
const theme = tslib_1.__importStar(require("./markdownTheme"));
class MarkdownCoverage {
    constructor(kernel, markdownEnvironment) {
        this.kernel = kernel;
        this.markdownEnvironment = markdownEnvironment;
        this.entries = [];
    }
    controller() {
        this.getEntries();
        this.getCoverageOptions();
        this.update();
    }
    getEntries() {
        this.entries = this.kernel.modules
            .repoManager.getEntries(this.markdownEnvironment.repo);
    }
    getCoverageOptions() {
        this.coverageOptions = this.kernel.modules
            .repoManager.getCoverageOptions(this.markdownEnvironment.repo);
    }
    createRequest(entry) {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/coverage",
            userAgent: "@markdown",
            body: this.coverageOptions,
            headers
        };
    }
    update() {
        const pages = [];
        const promises = this.entries.map(entry => {
            const messages = [];
            return processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then(response => {
                response.whenCoverage(coverage => {
                    const files = this.kernel.modules.coverage.coverageToTable(coverage.body.data);
                    const data = this.writeToLines(files);
                    const headerLines = [];
                    this.writeHeader(headerLines, entry, data.shouldThrow);
                    this.writeChart(headerLines, coverage.body.data);
                    const finalLines = filters_1.filterLines(headerLines.concat(data.lines));
                    pages.push(finalLines);
                });
                response.whenError(error => {
                    this.kernel.modules.messages.error(this.markdownEnvironment, error.body);
                });
            });
        });
        Promise.all(promises).then(() => {
            const lines = [];
            pages.forEach(page => page.forEach(line => lines.push(line)));
            if (validators_1.stringHasLength(this.markdownEnvironment.coverageOptions.path)) {
                fs_1.writeFileSync(this.markdownEnvironment.coverageOptions.path, lines.join("\n"));
            }
        });
    }
    writeHeader(lines, entry, shouldThrow) {
        theme.h2(lines, entry);
        lines.push(theme.oneSpace());
        shouldThrow ?
            lines.push(`<img src="https://img.shields.io/badge/Coverage-Under%20Threshold-red" />`) :
            lines.push(`<img src="https://img.shields.io/badge/Coverage-Above%20Threshold-green" />`);
        lines.push(theme.oneSpace());
    }
    writeChart(lines, data) {
        const report = this.kernel.modules.coverage.calcTotalFromFiles(data);
        theme.h3(lines, "Totals");
        lines.push("");
        lines.push(`| Total Functions | Total Branches | Total Statements |`);
        lines.push("|---:|---:|---:|");
        lines.push(`| ${report.functionsAverageString} | ${report.branchesAverageString} | ${report.statementAverageString} |`);
        lines.push(theme.oneSpace());
        theme.h3(lines, "Files");
    }
    writeToLines(files) {
        const lines = [];
        let threshold = coolKids_1.numberOrDefault(this.coverageOptions.threshold, 0);
        let lessThanThreshold = false;
        files.forEach(file => {
            lines.push(theme.highlight(file.path) + "<br>");
            const segments = [
                `**Functions:** ${file.functionPercentage}%`,
                `**Branches:** ${file.branchPercentage}%`,
                `**Statements:** ${file.statementPercentage}%`
            ];
            const line = segments.join(theme.oneSpace());
            lines.push(line);
            lines.push(theme.oneSpace());
            if (file.statementCount < threshold) {
                lessThanThreshold = true;
            }
        });
        return {
            lines,
            shouldThrow: this.markdownEnvironment.console.throwWhenErrorsPresent && lessThanThreshold
        };
    }
}
exports.MarkdownCoverage = MarkdownCoverage;
//# sourceMappingURL=markdownCoverage.js.map