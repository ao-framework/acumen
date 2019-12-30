"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepoEnvironment {
    constructor() {
        this.baseDirectory = process.cwd();
        this.directory = "";
        this.entries = [];
        this.watches = [];
    }
}
exports.RepoEnvironment = RepoEnvironment;
//# sourceMappingURL=repoEnvironment.js.map