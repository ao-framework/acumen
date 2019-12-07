import { whenFunction } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequestCoverage } from "../../../../contracts/coverage/request/iDispatchRequestCoverage";
import { translateResponse } from "../../../../translation/translate";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";

export class JsonCoverage {

    public entries: string[] = [];

    public coverageOptions: iCoverageOptions;

    public constructor(private kernel: Kernel, private jsonEnvironment: JsonEnvironment) { }

    public controller() {
        this.getEntries();
        this.getCoverageOptions();
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.jsonEnvironment.repo);
    }

    public getCoverageOptions() {
        this.coverageOptions = this.kernel.modules.repoManager
            .getCoverageOptions(this.jsonEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestCoverage {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry)
        return {
            url: "/coverage",
            userAgent: "@json",
            body: this.coverageOptions,
            headers
        }
    }

    public update() {
        this.entries.forEach(entry => {
            const messages = [];
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then((response) => {
                    response.whenCoverage(coverage => {
                        whenFunction(this.jsonEnvironment.whenCoverage)(coverage.body.data);
                        this.kernel.modules.messages.info(this.jsonEnvironment, [
                            `<cyan>@json</cyan> coverage provided for: <magenta>${entry}</magenta>`
                        ])
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                        this.kernel.modules.messages.error(this.jsonEnvironment, error.body)
                    })
                }).catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    this.kernel.modules.messages.error(this.jsonEnvironment, splitError(err))
                })
        })
    }
}
