import { iAcumenSuiteConstructor } from "../../../contracts/api/iAcumenSuiteConstructor";
import { Suite } from "../../model/suite/suite";
/**
 * Provide a Acumen Suite Class as an argument. It will convert the class
 * declaration into a fully qualified Suite instance and return it.
 * @param suiteClass
 */
export declare function makeSuite(suiteClass: iAcumenSuiteConstructor): Suite;
/**
 * Provide a Acumen Suite Class and a parent suite (optional) as arguments. It will
 * convert the class declaration into a fully qualified Suite instance and return it.
 * @param suiteConstructor
 * @param parentSuite
 */
export declare function processSuiteClass(suiteConstructor: iAcumenSuiteConstructor, parentSuite?: Suite): Suite;
/**
 * Provide a method name as an argument. It will let return
 * a boolean value indicating that it is not a Generator
 * @param method
 */
export declare function isNotGenerator(method: string): boolean;
