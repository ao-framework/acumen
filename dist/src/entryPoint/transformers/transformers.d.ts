import { iTransformerMap } from "../../contracts/dispatch/iTransformerMap";
/**
 * The Transformer Map is an object listing all of the available
 * transformers so that the Dispatch will know how to forward requests.
 * Every transformer implements iTranformer so that the Dispatch can do
 * this blindly.
 */
export declare const transformerMap: iTransformerMap;
