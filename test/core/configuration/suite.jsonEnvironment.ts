import { Apparatus, JsonEnvironment } from "../../../src";
import { ConsoleEnvironment } from "../../../src/core/configuration/base/consoleEnvironment";
import { RepoEnvironment } from "../../../src/core/configuration/base/repoEnvironment";

export class SuiteJsonEnvironment {

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.defaultSettings))
    }

    public defaultSettings({ expect, spotlight, beforeThrowing }: Apparatus) {
        beforeThrowing(() => {
            spotlight("json", json)
        })
        const json = new JsonEnvironment()
        expect(json.whenCoverage).equal(undefined)
        expect(json.whenSchema).equal(undefined)
        expect(json.whenSnapshot).equal(undefined)
        expect(json.repo instanceof RepoEnvironment).equal(true)
        expect(json.console instanceof ConsoleEnvironment).equal(true)
    }
}
