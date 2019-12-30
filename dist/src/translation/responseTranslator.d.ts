import { iDispatchResponseCoverageHandler } from "../contracts/coverage/response/iDispatchResponseCoverageHandler";
import { iDispatchResponse } from "../contracts/dispatch/iDispatchResponse";
import { iDispatchResponseErrorHandler } from "../contracts/error/iDispatchResponseErrorHandler";
import { iDispatchResponseMessageHandler } from "../contracts/messages/iDispatchResponseMessageHandler";
import { iDispatchResponseSchemaHandler } from "../contracts/schema/response/iDispatchResponseSchemaHandler";
import { iDispatchResponseSnapshotHandler } from "../contracts/snapshots/response/iDispatchResponseSnapshotHandler";
export declare class ResponseTranslator {
    constructor(response: iDispatchResponse<any, any>);
    whenMessage(handler: iDispatchResponseMessageHandler): void;
    whenSchema(handler: iDispatchResponseSchemaHandler): void;
    whenSnapshot(handler: iDispatchResponseSnapshotHandler): void;
    whenCoverage(handler: iDispatchResponseCoverageHandler): void;
    whenError(handler: iDispatchResponseErrorHandler): void;
}
