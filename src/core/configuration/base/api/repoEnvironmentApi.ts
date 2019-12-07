import { join } from "path";

import { iCoverageOptions } from "../../../../contracts/coverage/request/iCoverageOptions";
import { RepoEnvironment } from "../repoEnvironment";

export class RepoEnvironmentApi {

    public constructor(private repo: RepoEnvironment) { }

    public directory(directory: string) {
        this.repo.directory = join(process.cwd(), directory);
        return this;
    }

    public entry(relativePath: string) {
        this.repo.entries.push(join(this.repo.directory, relativePath))
        return this;
    }

    public watch(relativePath: string) {
        this.repo.watches.push(join(this.repo.directory, relativePath))
        return this;
    }

    public coverageOptions(options: iCoverageOptions) {
        this.repo.coverageOptions = options;
    }
}
