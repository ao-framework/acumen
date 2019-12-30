import { iFunction } from "../../../../contracts/base/iFunction";
import { MarkdownEnvironment } from "../../../configuration/markdownEnvironment";
import { KernelDriver } from "../../kernelDriver";
import { MarkdownCoverage } from "./markdownCoverage";
import { MarkdownSchema } from "./markdownSchema";
import { MarkdownSnapshot } from "./markdownSnapshot";
export declare class MarkdownDriver extends KernelDriver {
    schemas: MarkdownSchema[];
    snapshots: MarkdownSnapshot[];
    coverages: MarkdownCoverage[];
    stopListening: iFunction;
    controller(): void;
    loadMarkdownEnvironment(markdown: MarkdownEnvironment): void;
    loadSchema(markdown: MarkdownEnvironment): void;
    loadSnapshot(markdown: MarkdownEnvironment): void;
    loadCoverage(markdown: MarkdownEnvironment): void;
    registerWatching(markdown: MarkdownEnvironment): void;
}
