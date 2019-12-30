const { conceptualize } = require("./dist/src")
const fs = require("fs");

module.exports = {
    concepts: {
        "test/build": (environment) => {
            conceptualize(environment)
                .terminalEnvironment(terminal => {
                    terminal.console.mode("verbose")
                    terminal.snapshot();
                    terminal.repo.entry("dist/test/bootstrap.js");
                    terminal.console.throwWhenErrorsPresent(true);
                })
        },
        "dev": (environment) => {
            conceptualize(environment)
                .serverEnvironment(server => {
                    server.repo.entry("dist/test/bootstrap.js");
                    server.repo.entry("dist/test/commons/bootstrap.commonsDirectory.js")
                    server.port(4000);
                    server.repo.watch("dist/test")
                    server.repo.watch("dist/src")
                    server.repo.coverageOptions({
                        includeDirectories: ["dist/src"],
                        excludeDirectories: ["dist/src/contracts"],
                        threshold: 80
                    })
                })
        }
    }
}
