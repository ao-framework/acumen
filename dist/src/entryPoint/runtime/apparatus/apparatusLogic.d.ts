import { iErrorMessage } from "../../../contracts/error/helpers/iErrorMessage";
import { Controller } from "../../model/controller/controller";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";
import { RuntimeContainer } from "../runtimeContainer";
import { Apparatus } from "./apparatus";
/**
 * Helper method to ensure to either use the name provided or
 * scalp it from the function reference
 * @param context
 */
export declare function byNameOrFunctionName(context: string | Function): string;
/**
 * Handles binding all of the method on the apparatus to the apparatus
 * so that when they are destructured, everything still works properly
 * @param apparatus
 * @param container
 */
export declare function bindFunctions(apparatus: Apparatus, container: RuntimeContainer): void;
/**
 * Gets the child suite but throws an error if it doesn't exist
 * @param suite
 * @param name
 * @param message
 */
export declare function whenChildSuite(suite: Suite, name: string, message: iErrorMessage): Suite;
/**
 * Get the controller from a suite but throws an error if it doesn't exist
 * @param suite
 * @param message
 */
export declare function whenSuiteController(suite: Suite, message: iErrorMessage): Controller;
/**
 * Gets a test from a suite but throws an error if it doesn't exist
 * @param suite
 * @param name
 * @param message
 */
export declare function whenTest(suite: Suite, name: string, message: iErrorMessage): Test;
/**
 * Gets the fully qualified name of a suite or test
 * @param context
 */
export declare function suiteOrTestFullName(context: Suite | Test): string;
/**
 * Helper method to loop through all tests
 * @param suite
 * @param handler
 */
export declare function eachTest(suite: Suite, handler: (test: Test) => any): void;
