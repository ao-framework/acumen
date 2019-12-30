import { iSuiteInformation } from "../../../contracts/base/iSuiteInformation";
import { Suite } from "./suite";
/**
 * Helper function to check a name and see if it is
 * viable for a suite name
 * @param name
 */
export declare function validateName(name: string): string;
/**
 * Get SuiteInformation for an instance of a suite
 * @param suite
 */
export declare function suiteInformation(suite: Suite): iSuiteInformation;
/**
 * Get the breadcrumbs from a paretnt suite
 * @param parentSuite
 */
export declare function getBreadcrumbsFromParentSuite(parentSuite: Suite): string[];
/**
 * If the description is set, use it. If it is not set, return void.
 * This way, we won't have any weird in the descriptions.
 * @param description
 */
export declare function validateDescription(description: string): string;
