import { Apparatus } from "../src";
import { EntryCliDirectory } from "./cli/entry.cliDirectory";
import { EntryCommonsDirectory } from "./commons/entry.commonsDirectory";
export declare class EntryGlobal {
    suites: (typeof EntryCliDirectory | typeof EntryCommonsDirectory)[];
    controller({ suite }: Apparatus): Promise<void>;
}
