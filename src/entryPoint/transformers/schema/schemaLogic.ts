import { formatCode } from "../../../commons/formatCode";
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
export function toSchema(suite: Suite): iSchemaResponseData {
    return { suite: processSuite(suite) }
}

/**
 * Provide a Suite instance as an argument. It will remap
 * the instance to an iSchemaSuite and return it
 * @param suite 
 */
export function processSuite(suite: Suite): iSchemaSuite {
    const suiteSchema: iSchemaSuite = { tests: {}, suites: {} } as iSchemaSuite;
    suiteSchema.name = suite.name;
    suiteSchema.description = suite.description;
    suiteSchema.breadCrumbs = suite.breadCrumbs;
    if (suite.controller) { suiteSchema.controller = processTest(suite.controller) }
    for (let iterator in suite.tests) { suiteSchema.tests[iterator] = processTest(suite.tests[iterator]) }
    for (let iterator in suite.suites) { suiteSchema.suites[iterator] = processSuite(suite.suites[iterator]) }
    return suiteSchema;
}

/**
 * Provide a Test instance as an argument. It will remap it to
 * a iSchemaTest and return it
 * @param test 
 */
export function processTest(test: Test): iSchemaTest {
    const testSchema: iSchemaTest = {} as iSchemaTest;
    testSchema.command = test.command;
    testSchema.description = test.description;
    testSchema.suiteInformation = {
        name: test.suiteInformation.name,
        description: test.suiteInformation.description,
        breadCrumbs: test.suiteInformation.breadCrumbs.slice()
    }
    testSchema.breadCrumbs = test.breadCrumbs;
    testSchema.hasFunction = test.hasFunction;
    if (test.hasFunction) {
        if (test.fromClass) {
            testSchema.functionCode = formatCode(`class ${test.suiteInformation.name} { ${test.handler.toString()} }`);
        } else {
            testSchema.functionCode = formatCode(test.handler.toString());
        }
    }
    return testSchema;
}



