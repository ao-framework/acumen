/// <reference types="node" />
import inspector from "inspector";
export declare type iCoverageTable = {
    [key: string]: inspector.Profiler.ScriptCoverage;
};
