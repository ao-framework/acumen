import { whenNotString, whenStringVoidOfCharacters } from "../../../commons/coolKids";
import { iSuiteInformation } from "../../../contracts/base/iSuiteInformation";
import { Suite } from "./suite";

/**
 * Helper function to check a name and see if it is
 * viable for a suite name
 * @param name 
 */
export function validateName(name: string) {
    whenNotString(name, `Suite can not be named ${name}`)
    whenStringVoidOfCharacters(name, `Suite name can not be set to an empty string`)
    return name;
}

/**
 * Get SuiteInformation for an instance of a suite
 * @param suite 
 */
export function suiteInformation(suite: Suite): iSuiteInformation {
    return {
        name: suite.name,
        description: suite.description,
        breadCrumbs: suite.breadCrumbs.slice()
    }
}

/**
 * Get the breadcrumbs from a paretnt suite
 * @param parentSuite 
 */
export function getBreadcrumbsFromParentSuite(parentSuite: Suite) {
    if (parentSuite instanceof Suite) {
        return parentSuite.breadCrumbs.slice();
    }
    return [];
}

/**
 * If the description is set, use it. If it is not set, return void.
 * This way, we won't have any weird in the descriptions.
 * @param description 
 */
export function validateDescription(description: string) {
    if (typeof description === "string" && description.length > 0) {
        return description;
    }
    return void 0;
}
