"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class RepoEnvironmentApi {
    constructor(repo) {
        this.repo = repo;
    }
    directory(directory) {
        this.repo.directory = path_1.join(process.cwd(), directory);
        return this;
    }
    entry(relativePath) {
        this.repo.entries.push(path_1.join(this.repo.directory, relativePath));
        return this;
    }
    watch(relativePath) {
        this.repo.watches.push(path_1.join(this.repo.directory, relativePath));
        return this;
    }
    coverageOptions(options) {
        this.repo.coverageOptions = options;
    }
}
exports.RepoEnvironmentApi = RepoEnvironmentApi;
//# sourceMappingURL=repoEnvironmentApi.js.map