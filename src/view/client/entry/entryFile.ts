
import { iCoverageResponseData } from "../../../contracts/coverage/model/iCoverageResponseData";
import { iSchemaResponseData } from "../../../contracts/schema/model/iSchemaResponseData";
import { iSnapshotResponseData } from "../../../contracts/snapshots/model/iSnapshotResponseData";
import { getBase64, getShortPath } from "./entryLogic";

export class EntryFile {

    /**
     * The path for the entry file relative to the 
     * host operating system
     */
    public path: string;

    /**
     * The path of the entry relative to the host
     * operating system minus the current working 
     * directory of the developer's code base
     */
    public shortPath: string;

    /**
     * The base64 version of the full path of the entry file.
     * This is used link references for the vue-router to have
     * valid strings that will cause no problems.
     */
    public base64: string;

    /**
     * Whether or not this entry file is
     * loading or reloading its schema
     */
    public schemaLoading: boolean = true;

    /**
     * Whether or not this entry file is
     * loading or reloading its snapshot
     */
    public snapshotLoading: boolean = true;

    /**
     * Whether or not this entry file is
     * loading or reloading its coverage
     */
    public coverageLoading: boolean = true;

    /**
     * The data for the entry's current schema
     */
    public schema: iSchemaResponseData = null;

    /**
     * The data for the entry's current snaphsot
     */
    public snapshot: iSnapshotResponseData = null;

    /**
     * The data for the entry's current coverage report
     */
    public coverage: iCoverageResponseData = null;


    /**
     * Creates the instance of the entry file and sets the relevant 
     * properties for the consumption of all sub components
     * @param entry 
     * @param currentWorkingDirectory 
     */
    public constructor(entry: string, currentWorkingDirectory: string) {
        this.path = entry;
        this.shortPath = getShortPath(entry, currentWorkingDirectory)
        this.base64 = getBase64(entry);
    }
}
