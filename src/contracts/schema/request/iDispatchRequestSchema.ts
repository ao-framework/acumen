import { iDispatchRequest } from "../../dispatch/iDispatchRequest";
import { iDispatchRequestSchemaBody } from "./iDispatchRequestSchemaBody";
import { iDispatchRequestSchemaHeaders } from "./iDispatchRequestSchemaHeaders";

export type iDispatchRequestSchema = iDispatchRequest<iDispatchRequestSchemaBody, iDispatchRequestSchemaHeaders>;
