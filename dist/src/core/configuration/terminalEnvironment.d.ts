import { Environment } from "./base/environment";
export declare class TerminalEnvironment extends Environment {
    /**
     * List of transformers to call on an test entry point
     */
    transformers: string[];
}
