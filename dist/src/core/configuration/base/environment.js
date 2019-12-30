"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleEnvironment_1 = require("./consoleEnvironment");
const repoEnvironment_1 = require("./repoEnvironment");
class Environment {
    constructor() {
        this.console = new consoleEnvironment_1.ConsoleEnvironment();
        this.repo = new repoEnvironment_1.RepoEnvironment();
    }
}
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map