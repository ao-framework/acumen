import { Apparatus } from "../../src";
import { SuiteCoolKids } from "./suite.coolKids";
import { SuiteDebounce } from "./suite.debounce";
import { SuiteFilesystemValidators } from "./suite.filesystemValidators";
import { SuiteFormatCode } from "./suite.formatCode";
import { SuiteHelpers } from "./suite.helpers";
import { SuiteProcessors } from "./suite.processors";
import { SuiteQueue } from "./suite.queue";
import { SuiteValidators } from "./suite.validators";
import { SuiteVariableDiagram } from "./suite.variableDiagram";
import { SuiteWatchers } from "./suite.watchers";

export class EntryCommonsDirectory {

    public descriptions = {
        suite: "Main entry point for the commons directory"
    }

    public suites = [
        SuiteCoolKids,
        SuiteDebounce,
        SuiteFilesystemValidators,
        SuiteFormatCode,
        SuiteHelpers,
        SuiteProcessors,
        SuiteQueue,
        SuiteValidators,
        SuiteVariableDiagram,
        SuiteWatchers
    ]

    public async controller({ suite, expect }: Apparatus) {
        return Promise.resolve()
            .then(() => suite(SuiteCoolKids))
            .then(() => suite(SuiteDebounce))
            .then(() => suite(SuiteFilesystemValidators))
            .then(() => suite(SuiteFormatCode))
            .then(() => suite(SuiteHelpers))
            .then(() => suite(SuiteProcessors))
            .then(() => suite(SuiteQueue))
            .then(() => suite(SuiteValidators))
            .then(() => suite(SuiteVariableDiagram))
            .then(() => suite(SuiteWatchers))
    }
}
