import { writeFileSync } from "fs";

import { numberOrDefault } from "../../../../commons/coolKids";
import { stringHasLength } from "../../../../commons/validators";
import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { translateResponse } from "../../../../translation/translate";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { filterLines } from "../../../processor/filters";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import * as theme from "./markdownTheme";

export class MarkdownCoverage {

    public entries: string[] = [];

    public coverageOptions: iCoverageOptions;

    public constructor(
        private kernel: Kernel,
        private markdownEnvironment: MarkdownEnvironment
    ) { }

    public controller() {
        this.getEntries();
        this.getCoverageOptions();
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules
            .repoManager.getEntries(this.markdownEnvironment.repo)
    }

    public getCoverageOptions() {
        this.coverageOptions = this.kernel.modules
            .repoManager.getCoverageOptions(this.markdownEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestCoverage {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry)
        return {
            url: "/coverage",
            userAgent: "@markdown",
            body: this.coverageOptions,
            headers
        }
    }

    public update() {
        const pages: string[][] = [];
        const promises = this.entries.map(entry => {
            const messages = [];
            return callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then(response => {
                    response.whenCoverage(coverage => {
                        const files = this.kernel.modules.coverage.coverageToTable(coverage.body.data);
                        const data = this.writeToLines(files);
                        const headerLines: string[] = [];
                        this.writeHeader(headerLines, entry, data.shouldThrow)
                        this.writeChart(headerLines, coverage.body.data)
                        const finalLines = filterLines(headerLines.concat(data.lines));
                        pages.push(finalLines);
                    });
                    response.whenError(error => {
                        this.kernel.modules.messages.error(this.markdownEnvironment, error.body);
                    })
                })
        })
        Promise.all(promises).then(() => {
            const lines = [];
            pages.forEach(page => page.forEach(line => lines.push(line)));
            if (stringHasLength(this.markdownEnvironment.coverageOptions.path)) {
                writeFileSync(this.markdownEnvironment.coverageOptions.path, lines.join("\n"))
            }
        })
    }

    public writeHeader(lines: string[], entry: string, shouldThrow: boolean) {
        theme.h2(lines, entry)
        lines.push(theme.oneSpace())
        shouldThrow ?
            lines.push(`<img src="https://img.shields.io/badge/Coverage-Under%20Threshold-red" />`) :
            lines.push(`<img src="https://img.shields.io/badge/Coverage-Above%20Threshold-green" />`)
        lines.push(theme.oneSpace())
    }

    public writeChart(lines: string[], data: iCoverageResponseData) {
        const report = this.kernel.modules.coverage.calcTotalFromFiles(data);
        theme.h3(lines, "Totals");
        lines.push("")
        lines.push(`| Total Functions | Total Branches | Total Statements |`)
        lines.push("|---:|---:|---:|")
        lines.push(`| ${report.functionsAverageString} | ${report.branchesAverageString} | ${report.statementAverageString} |`);
        lines.push(theme.oneSpace())
        theme.h3(lines, "Files")
    }

    public writeToLines(files: iCoverageTableFormat[]) {
        const lines: string[] = [];
        let threshold: number = numberOrDefault(this.coverageOptions.threshold, 0);
        let lessThanThreshold: boolean = false;
        files.forEach(file => {
            lines.push(theme.highlight(file.path) + "<br>")
            const segments = [
                `**Functions:** ${file.functionPercentage}%`,
                `**Branches:** ${file.branchPercentage}%`,
                `**Statements:** ${file.statementPercentage}%`
            ]
            const line = segments.join(theme.oneSpace())
            lines.push(line);
            lines.push(theme.oneSpace())
            if (file.statementCount < threshold) {
                lessThanThreshold = true;
            }
        })
        return {
            lines,
            shouldThrow: this.markdownEnvironment.console.throwWhenErrorsPresent && lessThanThreshold
        }
    }
}
