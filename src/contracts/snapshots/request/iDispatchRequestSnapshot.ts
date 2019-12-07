import { iDispatchRequest } from "../../dispatch/iDispatchRequest";
import { iDispatchRequestSnapshotBody } from "./iDispatchRequestSnapshotBody";
import { iDispatchRequestSnapshotHeaders } from "./iDispatchRequestSnapshotHeaders";

export type iDispatchRequestSnapshot = iDispatchRequest<iDispatchRequestSnapshotBody, iDispatchRequestSnapshotHeaders>;
