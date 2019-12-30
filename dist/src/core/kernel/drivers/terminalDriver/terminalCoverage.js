"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../../commons/coolKids");
const errorHandling_1 = require("../../../../commons/errorHandling");
const translate_1 = require("../../../../translation/translate");
const processor_1 = require("../../../processor/processor");
const terminalTheme_1 = require("./terminalTheme");
class TerminalCoverage {
    constructor(kernel, terminalEnvironment) {
        this.kernel = kernel;
        this.terminalEnvironment = terminalEnvironment;
        this.entries = [];
    }
    controller() {
        this.getEntries();
        this.getCoverageOptions();
        this.update();
    }
    getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.terminalEnvironment.repo);
    }
    getCoverageOptions() {
        this.coverageOptions = this.kernel.modules.repoManager
            .getCoverageOptions(this.terminalEnvironment.repo);
    }
    createRequest(entry) {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/coverage",
            userAgent: "@terminal",
            body: this.coverageOptions,
            headers
        };
    }
    update() {
        this.entries.forEach(entry => {
            const messages = [];
            processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then(response => {
                response.whenCoverage(coverage => {
                    const table = this.kernel.modules.coverage.coverageToTable(coverage.body.data);
                    const data = this.writeToLines(table);
                    const shouldThrow = this.terminalEnvironment.console.throwWhenErrorsPresent && data.shouldThrow;
                    this.writeFooter(data.lines, coverage.body.data);
                    this.kernel.modules.messages.info(this.terminalEnvironment, data.lines);
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    if (shouldThrow) {
                        errorHandling_1.throwExpection(`Coverage threshold not met.`);
                    }
                });
                response.whenError(error => {
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    this.kernel.modules.messages.error(this.terminalEnvironment, error.body);
                });
            })
                .catch((err) => {
                errorHandling_1.stopProccessIfAcumenError(err);
                this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                this.kernel.modules.messages.error(this.terminalEnvironment, errorHandling_1.splitError(err));
            });
        });
    }
    writeFooter(lines, coverage) {
        const report = this.kernel.modules.coverage.calcTotalFromFiles(coverage);
        lines.push(terminalTheme_1.keyword("Totals:"));
        lines.push("--------------------------");
        lines.push(terminalTheme_1.entityName("Functions: ") + report.functionsAverageString);
        lines.push(terminalTheme_1.entityName("Branches: ") + report.branchesAverageString);
        lines.push(terminalTheme_1.entityName("Statements: ") + report.statementAverageString);
        lines.push(terminalTheme_1.oneSpace());
    }
    writeToLines(files) {
        const lines = [];
        let threshold = coolKids_1.numberOrDefault(this.coverageOptions.threshold, 0);
        let lessThanThreshold = false;
        files.forEach(file => {
            lines.push(terminalTheme_1.keyword(file.path));
            const segments = [
                terminalTheme_1.entityName("Functions:") + terminalTheme_1.oneSpace() + file.functionPercentage + "%",
                terminalTheme_1.entityName("Branches:") + terminalTheme_1.oneSpace() + file.branchPercentage + "%",
                terminalTheme_1.entityName("Statements:") + terminalTheme_1.oneSpace() + file.statementPercentage + "%"
            ];
            const line = segments.join(terminalTheme_1.oneSpace());
            lines.push(line);
            lines.push(terminalTheme_1.oneSpace());
            if (file.statementCount < threshold) {
                lessThanThreshold = true;
            }
        });
        return {
            lines,
            shouldThrow: this.terminalEnvironment.console.throwWhenErrorsPresent && lessThanThreshold
        };
    }
}
exports.TerminalCoverage = TerminalCoverage;
//# sourceMappingURL=terminalCoverage.js.map