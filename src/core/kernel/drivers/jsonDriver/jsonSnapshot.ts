import { whenFunction } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { iDispatchRequestSnapshot } from "../../../../contracts/snapshots/request/iDispatchRequestSnapshot";
import { translateResponse } from "../../../../translation/translate";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";

export class JsonSnapshot {

    public entries: string[] = [];

    public constructor(
        private kernel: Kernel,
        private jsonEnvironment: JsonEnvironment
    ) { }

    public controller() {
        this.getEntries();
        this.update();
    }

    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.jsonEnvironment.repo);
    }

    public createRequest(entry: string): iDispatchRequestSnapshot {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@json",
            body: {},
            headers
        }
    }

    public update() {
        this.entries.forEach(entry => {
            const messages = [];
            callEntry(entry, this.createRequest(entry), messages)
                .then(response => translateResponse(response))
                .then(response => {
                    response.whenSnapshot(snapshot => {
                        whenFunction(this.jsonEnvironment.whenSnapshot)(snapshot.body.data);
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                        this.kernel.modules.messages.info(this.jsonEnvironment, [
                            `<cyan>@json</cyan> snapshot provided for: <magenta>${entry}</magenta>`
                        ])
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                        this.kernel.modules.messages.error(this.jsonEnvironment, error.body)
                    })
                })
                .catch((err: Error) => {
                    stopProccessIfAcumenError(err);
                    this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    this.kernel.modules.messages.error(this.jsonEnvironment, splitError(err))
                })
        })
    }
}
