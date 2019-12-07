import { iTransformerMap } from "../../contracts/dispatch/iTransformerMap";
import { Coverage } from "./coverage/coverage";
import { Schema } from "./schema/schema";
import { Snapshot } from "./snapshot/snapshot";

/**
 * The Transformer Map is an object listing all of the available 
 * transformers so that the Dispatch will know how to forward requests.
 * Every transformer implements iTranformer so that the Dispatch can do
 * this blindly.
 */
export const transformerMap: iTransformerMap = {
    "/schema": Schema,
    "/coverage": Coverage,
    "/snapshot": Snapshot,
}
