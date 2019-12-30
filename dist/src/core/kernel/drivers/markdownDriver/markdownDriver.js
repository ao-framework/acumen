"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const watchers_1 = require("../../../../commons/watchers");
const markdownEnvironment_1 = require("../../../configuration/markdownEnvironment");
const kernelDriver_1 = require("../../kernelDriver");
const markdownCoverage_1 = require("./markdownCoverage");
const markdownSchema_1 = require("./markdownSchema");
const markdownSnapshot_1 = require("./markdownSnapshot");
class MarkdownDriver extends kernelDriver_1.KernelDriver {
    constructor() {
        super(...arguments);
        this.schemas = [];
        this.snapshots = [];
        this.coverages = [];
    }
    controller() {
        this.environment.markdownEnvironments
            .forEach(environment => this.loadMarkdownEnvironment(environment));
    }
    loadMarkdownEnvironment(markdown) {
        this.loadSchema(markdown);
        this.loadSnapshot(markdown);
        this.loadCoverage(markdown);
        this.registerWatching(markdown);
    }
    loadSchema(markdown) {
        if (markdown.schemaOptions instanceof markdownEnvironment_1.MarkdownOptions) {
            const schema = new markdownSchema_1.MarkdownSchema(this.kernel, markdown);
            schema.controller();
            this.schemas.push(schema);
        }
    }
    loadSnapshot(markdown) {
        if (markdown.snapshotOptions instanceof markdownEnvironment_1.MarkdownOptions) {
            const snapshot = new markdownSnapshot_1.MarkdownSnapshot(this.kernel, markdown);
            snapshot.controller();
            this.snapshots.push(snapshot);
        }
    }
    loadCoverage(markdown) {
        if (markdown.coverageOptions instanceof markdownEnvironment_1.MarkdownOptions) {
            const coverage = new markdownCoverage_1.MarkdownCoverage(this.kernel, markdown);
            coverage.controller();
            this.coverages.push(coverage);
        }
    }
    registerWatching(markdown) {
        this.stopListening = watchers_1.setUpWatch(this.kernel.modules.repoManager.getWatches(markdown.repo), () => {
            this.schemas.forEach(schema => schema.update());
            this.snapshots.forEach(snapshot => snapshot.update());
            this.coverages.forEach(coverage => coverage.update());
        });
    }
}
exports.MarkdownDriver = MarkdownDriver;
//# sourceMappingURL=markdownDriver.js.map