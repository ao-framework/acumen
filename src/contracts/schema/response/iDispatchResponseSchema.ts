import { iDispatchResponse } from "../../dispatch/iDispatchResponse";
import { iDispatchResponseSchemaBody } from "./iDispatchResponseSchemaBody";
import { iDispatchResponseSchemaHeaders } from "./iDispatchResponseSchemaHeaders";

export type iDispatchResponseSchema = iDispatchResponse<iDispatchResponseSchemaBody, iDispatchResponseSchemaHeaders>
