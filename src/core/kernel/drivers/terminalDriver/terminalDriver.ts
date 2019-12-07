import { setUpWatch } from "../../../../commons/watchers";
import { TerminalEnvironment } from "../../../configuration/terminalEnvironment";
import { KernelDriver } from "../../kernelDriver";
import { TerminalCoverage } from "./terminalCoverage";
import { TerminalSchema } from "./terminalSchema";
import { TerminalSnapshot } from "./terminalSnapshot";

export class TerminalDriver extends KernelDriver {

    public controller() {
        this.environment.terminalEnvironments
            .forEach(environment => this.loadTerminalEnvironment(environment))
    }

    public loadTerminalEnvironment(terminal: TerminalEnvironment) {
        let snapshot: TerminalSnapshot;
        let schema: TerminalSchema;
        let coverage: TerminalCoverage;
        if (terminal.transformers.includes("schema")) {
            schema = new TerminalSchema(this.kernel, terminal);
            schema.controller();
        }
        if (terminal.transformers.includes("snapshot")) {
            snapshot = new TerminalSnapshot(this.kernel, terminal)
            snapshot.controller();
        }
        if (terminal.transformers.includes("coverage")) {
            coverage = new TerminalCoverage(this.kernel, terminal);
            coverage.controller()
        }
        setUpWatch(terminal.repo.watches, () => {
            if (schema instanceof TerminalSchema) { schema.update() }
            if (snapshot instanceof TerminalSnapshot) { snapshot.update() }
            if (coverage instanceof TerminalCoverage) { coverage.update() }
        })
    }
}
