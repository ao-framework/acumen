/// <reference types="node" />
import { EventEmitter } from "events";
import http from "http";
import WebSocket from "ws";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { Kernel } from "../../kernel";
import { AcumenServerMessenger } from "./acumenServerMessenger";
import { AcumenServerServices } from "./acumenServerServices";
export declare class AcumenServer extends EventEmitter {
    private kernel;
    private serverEnvironment;
    /**
     * Holds the default port number that is used when no port number
     * is supplied by the developer in configuration. #refactor
     */
    defaultPort: number;
    /**
     * Holds actual paths to all of the entry points
     */
    entries: string[];
    /**
     * Holds actual paths to all of the watch files
     */
    watches: string[];
    /**
     * Holds the coverage options with actual paths
     */
    coverageOptions: iCoverageOptions;
    /**
     * Holds the instance of node's http server
     */
    server: http.Server;
    /**
     * Holds the instance of the Websocket module #dependency #refactor.
     */
    private wss;
    /**
     * Holds the server messenging interface via websockets and
     * the console. If there is a need in the future to seperate,
     * will come to that then.
     */
    messenger: AcumenServerMessenger;
    /**
     * Holds instance of available http services and node's http server
     * handler so that it is easier to manage services
     */
    services: AcumenServerServices;
    /**
     * Provide an instance of the Kernel and a ServerEnvironment as arguments. It will
     * create the instance of the AcumenServer and do all setup save booting the server.
     * @param kernel
     * @param serverEnvironment
     */
    constructor(kernel: Kernel, serverEnvironment: ServerEnvironment);
    /**
     * Resolves actual paths of the entry points and caches them.
     */
    getEntries(): void;
    /**
     * Resolves actual paths of the coverage options and caches them
     */
    getCoverageOptions(): void;
    /**
     * Resolves actual paths of the watch files and caches them.
     */
    getWatches(): void;
    /**
     * If the allowOverNetwork flag is set, it will find the host ip address and
     * boot and call to create the server. If it is not set, it will set it up in
     * such a way that the server will not be accessible via the network.
     */
    setupServer(): void;
    /**
    * Helper method to setup the built in server and bind
    * the websockets to that server. It also bind all the listeners
    * to listen for changes
    * @param hostname
    * @param port
    */
    createServer(hostname: string, port: number): void;
    /**
     * Provide as instance of WebSocket and a list of entrypoints as arguments. It will
     * return function that can be used to route requests.
     * @param socket
     * @param entries
     */
    socketRouter(socket: WebSocket, entries: string[]): (data: string) => void;
}
