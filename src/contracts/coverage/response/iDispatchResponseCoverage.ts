import { iDispatchResponse } from "../../dispatch/iDispatchResponse";
import { iDispatchResponseCoverageBody } from "./iDispatchResponseCoverageBody";
import { iDispatchResponseCoverageHeaders } from "./iDispatchResponseCoverageHeaders";

export type iDispatchResponseCoverage = iDispatchResponse<iDispatchResponseCoverageBody, iDispatchResponseCoverageHeaders>
