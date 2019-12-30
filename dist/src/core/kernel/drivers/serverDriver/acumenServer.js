"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const http_1 = tslib_1.__importDefault(require("http"));
const ws_1 = tslib_1.__importDefault(require("ws"));
const coolKids_1 = require("../../../../commons/coolKids");
const helpers_1 = require("../../../../commons/helpers");
const validators_1 = require("../../../../commons/validators");
const watchers_1 = require("../../../../commons/watchers");
const processor_1 = require("../../../processor/processor");
const acumenServerMessenger_1 = require("./acumenServerMessenger");
const acumenServerServices_1 = require("./acumenServerServices");
class AcumenServer extends events_1.EventEmitter {
    /**
     * Provide an instance of the Kernel and a ServerEnvironment as arguments. It will
     * create the instance of the AcumenServer and do all setup save booting the server.
     * @param kernel
     * @param serverEnvironment
     */
    constructor(kernel, serverEnvironment) {
        super();
        this.kernel = kernel;
        this.serverEnvironment = serverEnvironment;
        /**
         * Holds the default port number that is used when no port number
         * is supplied by the developer in configuration. #refactor
         */
        this.defaultPort = 8080;
        /**
         * Holds actual paths to all of the entry points
         */
        this.entries = [];
        /**
         * Holds actual paths to all of the watch files
         */
        this.watches = [];
        /**
         * Holds the server messenging interface via websockets and
         * the console. If there is a need in the future to seperate,
         * will come to that then.
         */
        this.messenger = new acumenServerMessenger_1.AcumenServerMessenger(this.kernel, this.serverEnvironment);
        /**
         * Holds instance of available http services and node's http server
         * handler so that it is easier to manage services
         */
        this.services = new acumenServerServices_1.AcumenServerServices(this);
        this.getEntries();
        this.getCoverageOptions();
        this.getWatches();
    }
    /**
     * Resolves actual paths of the entry points and caches them.
     */
    getEntries() {
        this.entries = this.kernel.modules.repoManager
            .getEntries(this.serverEnvironment.repo);
    }
    /**
     * Resolves actual paths of the coverage options and caches them
     */
    getCoverageOptions() {
        this.coverageOptions = this.kernel.modules.repoManager
            .getCoverageOptions(this.serverEnvironment.repo);
    }
    /**
     * Resolves actual paths of the watch files and caches them.
     */
    getWatches() {
        this.watches = this.kernel.modules.repoManager
            .getWatches(this.serverEnvironment.repo);
        watchers_1.setUpWatch(this.watches, () => this.emit("change"));
    }
    /**
     * If the allowOverNetwork flag is set, it will find the host ip address and
     * boot and call to create the server. If it is not set, it will set it up in
     * such a way that the server will not be accessible via the network.
     */
    setupServer() {
        if (this.serverEnvironment.allowOverNetwork) {
            helpers_1.hostAddress()
                .then(address => {
                this.createServer(address, coolKids_1.numberOrDefault(this.serverEnvironment.port, this.defaultPort));
            });
        }
        else {
            this.createServer("localhost", coolKids_1.numberOrDefault(this.serverEnvironment.port, this.defaultPort));
        }
    }
    /**
    * Helper method to setup the built in server and bind
    * the websockets to that server. It also bind all the listeners
    * to listen for changes
    * @param hostname
    * @param port
    */
    createServer(hostname, port) {
        this.server = http_1.default.createServer(this.services.serverHandler());
        this.wss = new ws_1.default.Server({ server: this.server });
        if (hostname === "localhost") {
            this.server.listen(port, hostname, () => this.messenger.displayServerBooted(hostname, port));
        }
        else {
            this.server.listen(port, () => this.messenger.displayServerBooted(hostname, port));
        }
        this.wss.on("connection", (socket) => {
            this.messenger.alertSocketConnection(socket);
            const changer = () => this.messenger.alertChange(socket);
            this.on("change", changer);
            const handler = this.socketRouter(socket, this.entries);
            socket.on("message", handler);
            socket.on("close", () => socket.removeListener("message", handler));
            socket.on("close", () => this.removeListener("change", changer));
            socket.on("close", () => this.messenger.alertSocketDisconnection(socket));
        });
    }
    /**
     * Provide as instance of WebSocket and a list of entrypoints as arguments. It will
     * return function that can be used to route requests.
     * @param socket
     * @param entries
     */
    socketRouter(socket, entries) {
        return (data) => {
            try {
                const request = JSON.parse(data);
                if (validators_1.isObject(request) &&
                    validators_1.isObject(request.headers) &&
                    validators_1.isObject(request.headers.entry)) {
                    const messages = [];
                    if (request.url === "/coverage") {
                        request.body = this.coverageOptions;
                    }
                    processor_1.callEntry(request.headers.entry.path, request, messages)
                        .then(response => this.messenger.sendData(socket, response));
                }
                else {
                    this.messenger.sendError(socket, `Request headers does not contain a valid entry`);
                }
            }
            catch (err) {
                this.messenger.sendError(socket, err.message);
            }
        };
    }
}
exports.AcumenServer = AcumenServer;
//# sourceMappingURL=acumenServer.js.map