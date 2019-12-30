import { State } from "../model/state/state";
import { Suite } from "../model/suite/suite";
import { Test } from "../model/test/test";
import { Apparatus } from "./apparatus/apparatus";
import { RuntimeContainer } from "./runtimeContainer";
export declare class Runtime {
    /**
     * Whether or not a lean build is requested
     */
    isLean: boolean;
    /**
     * How many promises are currently out
     */
    awaiting: number;
    /**
     * How many have returned
     */
    returned: number;
    /**
     * Holds the global state for this runtime
     */
    globalState: State;
    /**
     * Whether or not this runtime instance is complete
     */
    get complete(): boolean;
    /**
     * Lease the root suite to the runtime. It will be resolved to back
     * when the runtime is complete
     * @param suite
     */
    leaseSuite(suite: Suite): Promise<Suite>;
    /**
     * Method for the apparatus to push a test into the runtime
     * @param suite
     * @param caller
     * @param test
     * @param args
     */
    processTest(suite: Suite, caller: Test, test: Test, args: any[]): Promise<void>;
    /**
     * The logic for dealing with async and sync functions and report errors
     * @param caller
     * @param test
     * @param apparatus
     * @param container
     * @param args
     */
    callable(caller: Test, test: Test, apparatus: Apparatus, container: RuntimeContainer, args: any[]): Promise<void>;
}
