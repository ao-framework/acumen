import { iDispatchResponse } from "../dispatch/iDispatchResponse";
import { iDispatchResponseErrorBody } from "./iDispatchResponseErrorBody";
import { iDispatchResponseErrorHeaders } from "./iDispatchResponseErrorHeaders";

export type iDispatchResponseError = iDispatchResponse<iDispatchResponseErrorBody, iDispatchResponseErrorHeaders>
