import { Apparatus } from "../../src";
import { EntryConfigurationDirectory } from "./configuration/entry.configurationDirectory";
export declare class EntryCoreDirectory {
    name: string;
    suites: (typeof EntryConfigurationDirectory)[];
    controller({ suite, test }: Apparatus): Promise<void>;
}
