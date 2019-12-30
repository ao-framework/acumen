import { iContentsHandler } from "../../contracts/base/iContentsHandler";
import { Environment } from "./base/environment";
export declare class MarkdownOptions {
    path: string;
    contentsHandler: iContentsHandler;
}
export declare class MarkdownEnvironment extends Environment {
    schemaOptions: MarkdownOptions;
    snapshotOptions: MarkdownOptions;
    coverageOptions: MarkdownOptions;
}
