import { iDispatchResponseCoverageHandler } from "../contracts/coverage/response/iDispatchResponseCoverageHandler";
import { iDispatchResponse } from "../contracts/dispatch/iDispatchResponse";
import { iDispatchResponseErrorHandler } from "../contracts/error/iDispatchResponseErrorHandler";
import { iDispatchResponseMessageHandler } from "../contracts/messages/iDispatchResponseMessageHandler";
import { iDispatchResponseSchemaHandler } from "../contracts/schema/response/iDispatchResponseSchemaHandler";
import { iDispatchResponseSnapshotHandler } from "../contracts/snapshots/response/iDispatchResponseSnapshotHandler";

const responses = new WeakMap<ResponseTranslator, iDispatchResponse<any, any>>()

export class ResponseTranslator {

    public constructor(response: iDispatchResponse<any, any>) {
        responses.set(this, response);
    }

    public whenMessage(handler: iDispatchResponseMessageHandler) {
        const response = responses.get(this);
        if (response.url === "/message") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }

    public whenSchema(handler: iDispatchResponseSchemaHandler) {
        const response = responses.get(this);
        if (response.url === "/schema") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }

    public whenSnapshot(handler: iDispatchResponseSnapshotHandler) {
        const response = responses.get(this)
        if (response.url === "/snapshot") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }

    public whenCoverage(handler: iDispatchResponseCoverageHandler) {
        const response = responses.get(this);
        if (response.url === "/coverage") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }

    public whenError(handler: iDispatchResponseErrorHandler) {
        const response = responses.get(this);
        if (response.url === "/error") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
}
