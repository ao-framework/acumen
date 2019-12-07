import { Apparatus } from "../src";
import { EntryCliDirectory } from "./cli/entry.cliDirectory";
import { EntryCommonsDirectory } from "./commons/entry.commonsDirectory";
import { EntryCoreDirectory } from "./core/entry.coreDirectory";

export class EntryGlobal {

    public suites = [
        EntryCliDirectory,
        EntryCommonsDirectory,
        EntryCoreDirectory
    ]

    public async controller({ suite }: Apparatus) {
        return Promise.resolve()
            .then(() => suite(EntryCliDirectory))
            .then(() => suite(EntryCommonsDirectory))
            .then(() => suite(EntryCoreDirectory))
    }
}
