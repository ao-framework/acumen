import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { iSnapshotSuite } from "../../../contracts/snapshots/model/iSnapshotSuite";
import { iSnapshotTest } from "../../../contracts/snapshots/model/iSnapshotTest";
import { iSnapshotTestInstance } from "../../../contracts/snapshots/model/iSnapshotTestInstance";
import { Suite } from "../../model/suite/suite";
import { Test } from "../../model/test/test";
import { TestInstance } from "../../model/testInstance/testInstance";
/**
 * Provide a Suite instance as an argument. It will remap the Suite instance
 * to a iSnapshotResponse and return a promise that will eventually resolve
 * the iSnapshotResponse.
 * @param suite
 */
export declare function createSnapshot(suite: Suite): Promise<iSnapshotResponseData>;
/**
 * Provide an instance of Suite and a callback (to be notified of errors) as argument. It will then
 * remap the suite to an iSnapshotSuite instance. It will return a Promise and will eventually resolve
 * the iSnapshotSuite instance.
 * @param suite
 * @param parentContainsFailure
 */
export declare function resolveSuite(suite: Suite, parentContainsFailure?: Function): Promise<iSnapshotSuite>;
/**
 * Provide a Test instance and a callback (to be notified of errors) as arguments. It will remap the Test
 * instance to an iSnapshotTest instance. It will return a Promise and eventually resolve the iSnapshotTest
 * @param test
 * @param suiteContainsFailure
 */
export declare function resolveTest(test: Test, suiteContainsFailure: Function): Promise<iSnapshotTest>;
/**
 * Promise a TestInstance instance, Test instance, and a callback (to be notified of errors) as arguments. It will
 * remap the TestInstance to iSnapshotTestInstance. It will return a Promise that will eventually resolve a iSnapshotTestInstance.
 * @param instance
 * @param test
 * @param suiteContainsFailure
 */
export declare function resolveTestInstance(instance: TestInstance, test: iSnapshotTest, suiteContainsFailure: Function): Promise<iSnapshotTestInstance>;
