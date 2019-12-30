"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./base/environment");
class ServerEnvironment extends environment_1.Environment {
    constructor() {
        super(...arguments);
        /**
         * When using the server, should connections be
         * allowed across the local network
         */
        this.allowOverNetwork = false;
        /**
         * The port number to run the server on
         */
        this.port = null;
        /**
         * Whether or not to use the browser's console
         */
        this.useBrowserConsole = false;
    }
}
exports.ServerEnvironment = ServerEnvironment;
//# sourceMappingURL=serverEnvironment.js.map