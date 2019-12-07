import { numberOrDefault } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError, throwExpection } from "../../../../commons/errorHandling";
import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { translateResponse } from "../../../../translation/translate";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import { entityName, keyword, oneSpace } from "./terminalTheme";

export class TerminalCoverage {

    public entries: string[] = [];

    public coverageOptions: iCoverageOptions;

    public constructor(
        private kernel: Kernel,
        private terminalEnvironment: TerminalEnvironment
    ) { }

    public controller() {
        this.getEntries();
        this.getCoverageOptions()
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.terminalEnvironment.repo);
    }

    public getCoverageOptions() {
        this.coverageOptions = this.kernel.modules.repoManager
            .getCoverageOptions(this.terminalEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestCoverage {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry)
        return {
            url: "/coverage",
            userAgent: "@terminal",
            body: this.coverageOptions,
            headers
        }
    }

    public update() {
        this.entries.forEach(entry => {
            const messages: string[] = []
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then(response => {
                    response.whenCoverage(coverage => {
                        const table = this.kernel.modules.coverage.coverageToTable(coverage.body.data)
                        const data = this.writeToLines(table);
                        const shouldThrow = this.terminalEnvironment.console.throwWhenErrorsPresent && data.shouldThrow;
                        this.writeFooter(data.lines, coverage.body.data);
                        this.kernel.modules.messages.info(this.terminalEnvironment, data.lines);
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                        if (shouldThrow) {
                            throwExpection(`Coverage threshold not met.`)
                        }
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                        this.kernel.modules.messages.error(this.terminalEnvironment, error.body)
                    })
                })
                .catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.terminalEnvironment, messages);
                    this.kernel.modules.messages.error(this.terminalEnvironment, splitError(err))
                })
        })
    }

    public writeFooter(lines: string[], coverage: iCoverageResponseData) {
        const report = this.kernel.modules.coverage.calcTotalFromFiles(coverage);
        lines.push(keyword("Totals:"))
        lines.push("--------------------------")
        lines.push(entityName("Functions: ") + report.functionsAverageString)
        lines.push(entityName("Branches: ") + report.branchesAverageString)
        lines.push(entityName("Statements: ") + report.statementAverageString)
        lines.push(oneSpace())
    }

    public writeToLines(files: iCoverageTableFormat[]) {
        const lines = [];
        let threshold: number = numberOrDefault(this.coverageOptions.threshold, 0);
        let lessThanThreshold: boolean = false;
        files.forEach(file => {
            lines.push(keyword(file.path))
            const segments = [
                entityName("Functions:") + oneSpace() + file.functionPercentage + "%",
                entityName("Branches:") + oneSpace() + file.branchPercentage + "%",
                entityName("Statements:") + oneSpace() + file.statementPercentage + "%"
            ]
            const line = segments.join(oneSpace())
            lines.push(line);
            lines.push(oneSpace())
            if (file.statementCount < threshold) {
                lessThanThreshold = true;
            }
        })
        return {
            lines,
            shouldThrow: this.terminalEnvironment.console.throwWhenErrorsPresent && lessThanThreshold
        }
    }
}
