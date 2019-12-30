"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./base/environment");
class TerminalEnvironment extends environment_1.Environment {
    constructor() {
        super(...arguments);
        /**
         * List of transformers to call on an test entry point
         */
        this.transformers = [];
    }
}
exports.TerminalEnvironment = TerminalEnvironment;
//# sourceMappingURL=terminalEnvironment.js.map