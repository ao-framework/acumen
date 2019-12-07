import { iDispatchRequest } from "../../dispatch/iDispatchRequest";
import { iDispatchRequestCoverageBody } from "./iDispatchRequestCoverageBody";
import { iDispatchRequestCoverageHeaders } from "./iDispatchRequestCoverageHeaders";

export type iDispatchRequestCoverage = iDispatchRequest<iDispatchRequestCoverageBody, iDispatchRequestCoverageHeaders>
