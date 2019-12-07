import { Apparatus } from "../../src";
import { Cli } from "../../src/cli/cli";

export class SuiteCli {

    public suites = []

    public descriptions = {
        suite: "Manages all functionality for the Cli class declaration.",
        controller: "is the controller",
        cliInstance: "lskdjflksjdflkjsdf"
    }

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.cliInstance))
    }

    public cliInstance({ spotlight, expect }: Apparatus) {
        const cli = new Cli(["node.exe", "script.js", "concept", "one", "two", "three"]);
        spotlight("cli", cli);
        expect(cli.nodeExecutable).to.equal("node.exe")
        expect(cli.scriptLocation).to.equal("script.js")
        expect(cli.concept).to.equal("concept")
        expect(cli.args[0]).to.equal("one")
        expect(cli.args[1]).to.equal("two")
        expect(cli.args[2]).to.equal("three");
    }

    public hasConfigFile() {

    }

    public getConcepts() {

    }

    public getConcept() {

    }

    public callConcept() {

    }
}
