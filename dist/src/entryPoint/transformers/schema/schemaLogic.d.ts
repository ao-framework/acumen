import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iSchemaSuite } from "../../../contracts/schema/model/iSchemaSuite";
import { iSchemaTest } from "../../../contracts/schema/model/iSchemaTest";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";
/**
 * Provide a Suite instance as an argument. It will remap
 * the instance to an iSchemaResponse and return it.
 * @param suite
 */
export declare function toSchema(suite: Suite): iSchemaResponseData;
/**
 * Provide a Suite instance as an argument. It will remap
 * the instance to an iSchemaSuite and return it
 * @param suite
 */
export declare function processSuite(suite: Suite): iSchemaSuite;
/**
 * Provide a Test instance as an argument. It will remap it to
 * a iSchemaTest and return it
 * @param test
 */
export declare function processTest(test: Test): iSchemaTest;
