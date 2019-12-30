"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("../../src/cli/cli");
class SuiteCli {
    constructor() {
        this.suites = [];
        this.descriptions = {
            suite: "Manages all functionality for the Cli class declaration.",
            controller: "is the controller",
            cliInstance: "lskdjflksjdflkjsdf"
        };
    }
    async controller({ suite, test }) {
        return Promise.resolve()
            .then(() => test(this.cliInstance));
    }
    cliInstance({ spotlight, expect }) {
        const cli = new cli_1.Cli(["node.exe", "script.js", "concept", "one", "two", "three"]);
        spotlight("cli", cli);
        expect(cli.nodeExecutable).to.equal("node.exe");
        expect(cli.scriptLocation).to.equal("script.js");
        expect(cli.concept).to.equal("concept");
        expect(cli.args[0]).to.equal("one");
        expect(cli.args[1]).to.equal("two");
        expect(cli.args[2]).to.equal("three");
    }
    hasConfigFile() {
    }
    getConcepts() {
    }
    getConcept() {
    }
    callConcept() {
    }
}
exports.SuiteCli = SuiteCli;
//# sourceMappingURL=suite.cli.js.map