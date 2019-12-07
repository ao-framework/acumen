import { Environment } from "./base/environment";

export class TerminalEnvironment extends Environment {
    /**
     * List of transformers to call on an test entry point
     */
    public transformers: string[] = [];
}
