import { Apparatus, MarkdownEnvironment } from "../../../src";

export class SuiteMarkdownEnvironment {

    public suites = []

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
    }

    public defaultSettings({ expect, spotlight, beforeThrowing }: Apparatus) {
        beforeThrowing(() => {

        })
        const markdown = new MarkdownEnvironment()
    }
}
