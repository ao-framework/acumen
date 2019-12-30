"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../../commons/coolKids");
const errorHandling_1 = require("../../../../commons/errorHandling");
const translate_1 = require("../../../../translation/translate");
const processor_1 = require("../../../processor/processor");
class JsonSnapshot {
    constructor(kernel, jsonEnvironment) {
        this.kernel = kernel;
        this.jsonEnvironment = jsonEnvironment;
        this.entries = [];
    }
    controller() {
        this.getEntries();
        this.update();
    }
    getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.jsonEnvironment.repo);
    }
    createRequest(entry) {
        const headers = this.kernel.modules.requests.getBaseHeadersForEntry(entry);
        return {
            url: "/snapshot",
            userAgent: "@json",
            body: {},
            headers
        };
    }
    update() {
        this.entries.forEach(entry => {
            const messages = [];
            processor_1.callEntry(entry, this.createRequest(entry), messages)
                .then(response => translate_1.translateResponse(response))
                .then(response => {
                response.whenSnapshot(snapshot => {
                    coolKids_1.whenFunction(this.jsonEnvironment.whenSnapshot)(snapshot.body.data);
                    this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    this.kernel.modules.messages.info(this.jsonEnvironment, [
                        `<cyan>@json</cyan> snapshot provided for: <magenta>${entry}</magenta>`
                    ]);
                });
                response.whenError(error => {
                    this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                    this.kernel.modules.messages.error(this.jsonEnvironment, error.body);
                });
            })
                .catch((err) => {
                errorHandling_1.stopProccessIfAcumenError(err);
                this.kernel.modules.messages.verbose(this.jsonEnvironment, messages);
                this.kernel.modules.messages.error(this.jsonEnvironment, errorHandling_1.splitError(err));
            });
        });
    }
}
exports.JsonSnapshot = JsonSnapshot;
//# sourceMappingURL=jsonSnapshot.js.map