import { iDispatchResponse } from "../dispatch/iDispatchResponse";
import { iDispatchResponseMessageBody } from "./iDispatchResponseMessageBody";
import { iDispatchResponseMessageHeaders } from "./iDispatchResponseMessageHeaders";

export type iDispatchResponseMessage = iDispatchResponse<iDispatchResponseMessageBody, iDispatchResponseMessageHeaders>
