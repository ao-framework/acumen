import { Environment } from "./base/environment";

export class ServerEnvironment extends Environment {
    /**
     * When using the server, should connections be
     * allowed across the local network
     */
    public allowOverNetwork: boolean = false;

    /**
     * The port number to run the server on
     */
    public port: number = null;

    /**
     * Whether or not to use the browser's console
     */
    public useBrowserConsole: boolean = false;
}
