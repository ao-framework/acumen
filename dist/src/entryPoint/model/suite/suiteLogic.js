"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../commons/coolKids");
const suite_1 = require("./suite");
/**
 * Helper function to check a name and see if it is
 * viable for a suite name
 * @param name
 */
function validateName(name) {
    coolKids_1.whenNotString(name, `Suite can not be named ${name}`);
    coolKids_1.whenStringVoidOfCharacters(name, `Suite name can not be set to an empty string`);
    return name;
}
exports.validateName = validateName;
/**
 * Get SuiteInformation for an instance of a suite
 * @param suite
 */
function suiteInformation(suite) {
    return {
        name: suite.name,
        description: suite.description,
        breadCrumbs: suite.breadCrumbs.slice()
    };
}
exports.suiteInformation = suiteInformation;
/**
 * Get the breadcrumbs from a paretnt suite
 * @param parentSuite
 */
function getBreadcrumbsFromParentSuite(parentSuite) {
    if (parentSuite instanceof suite_1.Suite) {
        return parentSuite.breadCrumbs.slice();
    }
    return [];
}
exports.getBreadcrumbsFromParentSuite = getBreadcrumbsFromParentSuite;
/**
 * If the description is set, use it. If it is not set, return void.
 * This way, we won't have any weird in the descriptions.
 * @param description
 */
function validateDescription(description) {
    if (typeof description === "string" && description.length > 0) {
        return description;
    }
    return void 0;
}
exports.validateDescription = validateDescription;
//# sourceMappingURL=suiteLogic.js.map