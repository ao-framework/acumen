import { whenFunction } from "../../../../commons/coolKids";
import { splitError, stopProccessIfAcumenError } from "../../../../commons/errorHandling";
import { iDispatchRequestSchema } from "../../../../contracts/schema/request/iDispatchRequestSchema";
import { translateResponse } from "../../../../translation/translate";
import { JsonEnvironment } from "../../../configuration/jsonEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";

export class JsonSchema {

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

    public createRequest(entry: string): iDispatchRequestSchema {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/schema",
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
                    response.whenSchema(schema => {
                        whenFunction(this.jsonEnvironment.whenSchema)(schema.body);
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                        this.kernel.modules.messages.info(this.jsonEnvironment, [
                            `<cyan>@json</cyan> schema provided for: <magenta>${entry}</magenta>`
                        ])
                    })
                    response.whenError(error => {
                        this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                        this.kernel.modules.messages.error(this.jsonEnvironment, error.body)
                    })
                })
                .catch((err: Error) => {
                    stopProccessIfAcumenError(err)
                    this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    this.kernel.modules.messages.error(this.jsonEnvironment, splitError(err))
                })
        })
    }
}
