import { setUpWatch } from "../../../../commons/watchers";
import { iFunction } from "../../../../contracts/base/iFunction";
import { MarkdownEnvironment, MarkdownOptions } from "../../../configuration/markdownEnvironment";
import { KernelDriver } from "../../kernelDriver";
import { MarkdownCoverage } from "./markdownCoverage";
import { MarkdownSchema } from "./markdownSchema";
import { MarkdownSnapshot } from "./markdownSnapshot";

export class MarkdownDriver extends KernelDriver {

    public schemas: MarkdownSchema[] = [];

    public snapshots: MarkdownSnapshot[] = [];

    public coverages: MarkdownCoverage[] = [];

    public stopListening: iFunction;

    public controller() {
        this.environment.markdownEnvironments
            .forEach(environment => this.loadMarkdownEnvironment(environment))
    }

    public loadMarkdownEnvironment(markdown: MarkdownEnvironment) {
        this.loadSchema(markdown);
        this.loadSnapshot(markdown)
        this.loadCoverage(markdown)
        this.registerWatching(markdown);
    }

    public loadSchema(markdown: MarkdownEnvironment) {
        if (markdown.schemaOptions instanceof MarkdownOptions) {
            const schema = new MarkdownSchema(this.kernel, markdown);
            schema.controller();
            this.schemas.push(schema);
        }
    }

    public loadSnapshot(markdown: MarkdownEnvironment) {
        if (markdown.snapshotOptions instanceof MarkdownOptions) {
            const snapshot = new MarkdownSnapshot(this.kernel, markdown);
            snapshot.controller();
            this.snapshots.push(snapshot);
        }
    }

    public loadCoverage(markdown: MarkdownEnvironment) {
        if (markdown.coverageOptions instanceof MarkdownOptions) {
            const coverage = new MarkdownCoverage(this.kernel, markdown)
            coverage.controller();
            this.coverages.push(coverage);
        }
    }

    public registerWatching(markdown: MarkdownEnvironment) {
        this.stopListening = setUpWatch(this.kernel.modules.repoManager.getWatches(markdown.repo), () => {
            this.schemas.forEach(schema => schema.update())
            this.snapshots.forEach(snapshot => snapshot.update())
            this.coverages.forEach(coverage => coverage.update())
        })
    }

}
