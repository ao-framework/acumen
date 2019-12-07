import { Apparatus } from "../../src";
import { EntryConfigurationDirectory } from "./configuration/entry.configurationDirectory";

export class EntryCoreDirectory {

    public name: string;

    public suites = [
        EntryConfigurationDirectory
    ]

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => suite(EntryConfigurationDirectory))
    }
}
