"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatCode_1 = require("../../../commons/formatCode");
/**
 * Provide a Suite instance as an argument. It will remap
 * the instance to an iSchemaResponse and return it.
 * @param suite
 */
function toSchema(suite) {
    return { suite: processSuite(suite) };
}
exports.toSchema = toSchema;
/**
 * Provide a Suite instance as an argument. It will remap
 * the instance to an iSchemaSuite and return it
 * @param suite
 */
function processSuite(suite) {
    const suiteSchema = { tests: {}, suites: {} };
    suiteSchema.name = suite.name;
    suiteSchema.description = suite.description;
    suiteSchema.breadCrumbs = suite.breadCrumbs;
    if (suite.controller) {
        suiteSchema.controller = processTest(suite.controller);
    }
    for (let iterator in suite.tests) {
        suiteSchema.tests[iterator] = processTest(suite.tests[iterator]);
    }
    for (let iterator in suite.suites) {
        suiteSchema.suites[iterator] = processSuite(suite.suites[iterator]);
    }
    return suiteSchema;
}
exports.processSuite = processSuite;
/**
 * Provide a Test instance as an argument. It will remap it to
 * a iSchemaTest and return it
 * @param test
 */
function processTest(test) {
    const testSchema = {};
    testSchema.command = test.command;
    testSchema.description = test.description;
    testSchema.suiteInformation = {
        name: test.suiteInformation.name,
        description: test.suiteInformation.description,
        breadCrumbs: test.suiteInformation.breadCrumbs.slice()
    };
    testSchema.breadCrumbs = test.breadCrumbs;
    testSchema.hasFunction = test.hasFunction;
    if (test.hasFunction) {
        if (test.fromClass) {
            testSchema.functionCode = formatCode_1.formatCode(`class ${test.suiteInformation.name} { ${test.handler.toString()} }`);
        }
        else {
            testSchema.functionCode = formatCode_1.formatCode(test.handler.toString());
        }
    }
    return testSchema;
}
exports.processTest = processTest;
//# sourceMappingURL=schemaLogic.js.map