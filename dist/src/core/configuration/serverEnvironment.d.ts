import { Environment } from "./base/environment";
export declare class ServerEnvironment extends Environment {
    /**
     * When using the server, should connections be
     * allowed across the local network
     */
    allowOverNetwork: boolean;
    /**
     * The port number to run the server on
     */
    port: number;
    /**
     * Whether or not to use the browser's console
     */
    useBrowserConsole: boolean;
}
