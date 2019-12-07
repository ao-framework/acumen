import { iDispatchResponse } from "../../dispatch/iDispatchResponse";
import { iDispatchResponseSnapshotBody } from "./iDispatchResponseSnapshotBody";
import { iDispatchResponseSnapshotHeaders } from "./iDispatchResponseSnapshotHeaders";

export type iDispatchResponseSnapshot = iDispatchResponse<iDispatchResponseSnapshotBody, iDispatchResponseSnapshotHeaders>
