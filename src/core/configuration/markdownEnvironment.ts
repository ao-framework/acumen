import { iContentsHandler } from "../../contracts/base/iContentsHandler";
import { Environment } from "./base/environment";

export class MarkdownOptions {
    public path: string;
    public contentsHandler: iContentsHandler
}

export class MarkdownEnvironment extends Environment {
    public schemaOptions: MarkdownOptions;
    public snapshotOptions: MarkdownOptions;
    public coverageOptions: MarkdownOptions;
}
