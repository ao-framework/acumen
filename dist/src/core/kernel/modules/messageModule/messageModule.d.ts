import { Environment } from "../../../configuration/base/environment";
import { KernelModules } from "../../kernelModules";
export declare class MessageModule {
    private modules;
    /**
     * Provide the kernel modules as an argument. It will
     * construct the instance of the MessageModule.
     */
    constructor(modules: KernelModules);
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as information.
     * @param environment
     * @param lines
     */
    info(environment: Environment, lines: string[]): void;
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as a warning.
     * @param environment
     * @param lines
     */
    warning(environment: Environment, lines: string[]): void;
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings as an error.
     * @param environment
     * @param lines
     */
    error(environment: Environment, lines: string[]): void;
    /**
     * Provide an instance of Environment and the lines to output as argument. It
     * will output the lines to the console for the environment settings only if
     * verbose logging is turned on.
     * @param environment
     * @param lines
     */
    verbose(environment: Environment, lines: string[]): void;
    /**
     * Provide the enviroment and a list lines as arguments. It will join
     * the lines together using the delimiter in the environment settings
     * @param environment
     * @param lines
     */
    join(environment: Environment, lines: string[]): string;
    /**
     * Provide environment and a list of lines as arguments. It will strip
     * all xml ansi element tags from the lines.
     * @param environment
     * @param lines
     */
    stripLines(environment: Environment, lines: string[]): string;
    /**
     * Provide environment and a list of lines as arguments. It will convert
     * all xml ansi element tags to fully qualified ansi characters.
     * @param environment
     * @param lines
     */
    ansiLines(environment: Environment, lines: string[]): string;
}
