import { EventEmitter } from "events";
import http from "http";
import WebSocket from "ws";

import { numberOrDefault } from "../../../../commons/coolKids";
import { hostAddress } from "../../../../commons/helpers";
import { isObject } from "../../../../commons/validators";
import { setUpWatch } from "../../../../commons/watchers";
import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { iDispatchRequest } from "../../../../contracts/dispatch/iDispatchRequest";
import { ServerEnvironment } from "../../../configuration/serverEnvironment";
import { callEntry } from "../../../processor/processor";
import { Kernel } from "../../kernel";
import { AcumenServerMessenger } from "./acumenServerMessenger";
import { AcumenServerServices } from "./acumenServerServices";

export class AcumenServer extends EventEmitter {

    /**
     * Holds the default port number that is used when no port number
     * is supplied by the developer in configuration. #refactor
     */
    public defaultPort: number = 8080;

    /**
     * Holds actual paths to all of the entry points
     */
    public entries: string[] = [];

    /**
     * Holds actual paths to all of the watch files
     */
    public watches: string[] = [];

    /**
     * Holds the coverage options with actual paths
     */
    public coverageOptions: iCoverageOptions;

    /**
     * Holds the instance of node's http server
     */
    public server: http.Server

    /**
     * Holds the instance of the Websocket module #dependency #refactor.
     */
    private wss: WebSocket.Server;

    /**
     * Holds the server messenging interface via websockets and
     * the console. If there is a need in the future to seperate,
     * will come to that then.
     */
    public messenger = new AcumenServerMessenger(this.kernel, this.serverEnvironment);

    /**
     * Holds instance of available http services and node's http server
     * handler so that it is easier to manage services
     */
    public services = new AcumenServerServices(this);

    /**
     * Provide an instance of the Kernel and a ServerEnvironment as arguments. It will
     * create the instance of the AcumenServer and do all setup save booting the server.
     * @param kernel 
     * @param serverEnvironment 
     */
    public constructor(
        private kernel: Kernel,
        private serverEnvironment: ServerEnvironment
    ) {
        super();
        this.getEntries();
        this.getCoverageOptions();
        this.getWatches();
    }

    /**
     * Resolves actual paths of the entry points and caches them.
     */
    public getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.serverEnvironment.repo)
    }

    /**
     * Resolves actual paths of the coverage options and caches them
     */
    public getCoverageOptions() {
        this.coverageOptions = this.kernel.modules.repoManager
            .getCoverageOptions(this.serverEnvironment.repo);
    }

    /**
     * Resolves actual paths of the watch files and caches them.
     */
    public getWatches() {
        this.watches = this.kernel.modules.repoManager
            .getWatches(this.serverEnvironment.repo)
        setUpWatch(this.watches, () => this.emit("change"))
    }

    /**
     * If the allowOverNetwork flag is set, it will find the host ip address and
     * boot and call to create the server. If it is not set, it will set it up in
     * such a way that the server will not be accessible via the network.
     */
    public setupServer() {
        if (this.serverEnvironment.allowOverNetwork) {
            hostAddress()
                .then(address => {
                    this.createServer(address,
                        numberOrDefault(this.serverEnvironment.port, this.defaultPort))
                })
        } else {
            this.createServer("localhost",
                numberOrDefault(this.serverEnvironment.port, this.defaultPort))
        }
    }

    /**
    * Helper method to setup the built in server and bind
    * the websockets to that server. It also bind all the listeners
    * to listen for changes
    * @param hostname 
    * @param port 
    */
    public createServer(hostname: string, port: number) {
        this.server = http.createServer(this.services.serverHandler());
        this.wss = new WebSocket.Server({ server: this.server });
        if (hostname === "localhost") {
            this.server.listen(port, hostname, () => this.messenger.displayServerBooted(hostname, port))
        } else {
            this.server.listen(port, () => this.messenger.displayServerBooted(hostname, port))
        }

        this.wss.on("connection", (socket) => {
            this.messenger.alertSocketConnection(socket);
            const changer = () => this.messenger.alertChange(socket);
            this.on("change", changer)
            const handler = this.socketRouter(socket, this.entries)
            socket.on("message", handler)
            socket.on("close", () => socket.removeListener("message", handler))
            socket.on("close", () => this.removeListener("change", changer))
            socket.on("close", () => this.messenger.alertSocketDisconnection(socket))
        })
    }

    /**
     * Provide as instance of WebSocket and a list of entrypoints as arguments. It will
     * return function that can be used to route requests.
     * @param socket 
     * @param entries 
     */
    public socketRouter(socket: WebSocket, entries: string[]) {
        return (data: string) => {
            try {
                const request: iDispatchRequest<any, any> = JSON.parse(data)
                if (isObject(request) &&
                    isObject(request.headers) &&
                    isObject(request.headers.entry)) {
                    const messages: string[] = [];
                    if (request.url === "/coverage") { request.body = this.coverageOptions }
                    callEntry(request.headers.entry.path, request, messages)
                        .then(response => this.messenger.sendData(socket, response))
                } else {
                    this.messenger.sendError(socket, `Request headers does not contain a valid entry`)
                }
            } catch (err) {
                this.messenger.sendError(socket, err.message);
            }
        }
    }
}
