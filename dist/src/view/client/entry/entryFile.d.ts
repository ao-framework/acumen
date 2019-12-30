import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
export declare class EntryFile {
    /**
     * The path for the entry file relative to the
     * host operating system
     */
    path: string;
    /**
     * The path of the entry relative to the host
     * operating system minus the current working
     * directory of the developer's code base
     */
    shortPath: string;
    /**
     * The base64 version of the full path of the entry file.
     * This is used link references for the vue-router to have
     * valid strings that will cause no problems.
     */
    base64: string;
    /**
     * Whether or not this entry file is
     * loading or reloading its schema
     */
    schemaLoading: boolean;
    /**
     * Whether or not this entry file is
     * loading or reloading its snapshot
     */
    snapshotLoading: boolean;
    /**
     * Whether or not this entry file is
     * loading or reloading its coverage
     */
    coverageLoading: boolean;
    /**
     * The data for the entry's current schema
     */
    schema: iSchemaResponseData;
    /**
     * The data for the entry's current snaphsot
     */
    snapshot: iSnapshotResponseData;
    /**
     * The data for the entry's current coverage report
     */
    coverage: iCoverageResponseData;
    /**
     * Creates the instance of the entry file and sets the relevant
     * properties for the consumption of all sub components
     * @param entry
     * @param currentWorkingDirectory
     */
    constructor(entry: string, currentWorkingDirectory: string);
}
