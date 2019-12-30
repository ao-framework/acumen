"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coverage_1 = require("./coverage/coverage");
const schema_1 = require("./schema/schema");
const snapshot_1 = require("./snapshot/snapshot");
/**
 * The Transformer Map is an object listing all of the available
 * transformers so that the Dispatch will know how to forward requests.
 * Every transformer implements iTranformer so that the Dispatch can do
 * this blindly.
 */
exports.transformerMap = {
    "/schema": schema_1.Schema,
    "/coverage": coverage_1.Coverage,
    "/snapshot": snapshot_1.Snapshot,
};
//# sourceMappingURL=transformers.js.map