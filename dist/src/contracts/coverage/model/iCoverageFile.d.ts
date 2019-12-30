/// <reference types="node" />
import inspector from "inspector";
export interface Location {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
}
export interface BranchMap {
    type: string;
    line: number;
    loc: Location;
    locations: Location[];
}
export interface FunctionMap {
    name: string;
    decl: Location;
    loc: Location;
    line: number;
    skip: true | undefined;
}
export interface v8Coverage {
    /**
     * The path to the file. This is an absolute path,
     * and should be the same as the key in the report object.
     */
    path: string;
    /**
     * Hash where keys are statement IDs, and values are Location objects for each
     * statement. The Location for a function definition is really an assignment, and
     * should include the entire function. In addition to the normal location object fields,
     * a statementMap entry can also have an optional skip field.
     */
    statementMap: {
        [key: string]: Location;
    };
    /**
     * Hash of statement counts, where keys as statement IDs.
     */
    s: {
        [key: string]: number;
    };
    /**
     * Hash where keys are branch IDs, and values are {line, type,
     * locations} objects. line is the line the branch starts on. type
     * is the type of the branch (e.g. "if", "switch"). locations is an
     * array of Location objects, one for each possible outcome of the
     * branch. Note for an if statement where there is no else clause,
     * there will still be two locations generated. Istanbul does not
     * generate coverage for the default case of a switch statement if
     * default is not explicitly present in the source code.
     */
    branchMap: {
        [key: string]: BranchMap;
    };
    /**
     * Hash of branch counts, where keys are branch IDs and values are
     * arrays of counts. For an if statement, the value would have
     * two counts; one for the if, and one for the else. Switch
     * statements would have an array of values for each case.
     */
    b: {
        [key: string]: number[];
    };
    /**
     * Hash of functions where keys are function IDs, and values are
     * {name, line, loc, skip}, where name is the name of the function,
     * line is the line the function is declared on, and loc is the
     * Location of the function declaration (just the declaration,
     * not the entire function body - see 'Location Objects' below.)
     * If skip is present and true, then this indicates that this
     * function was ignored by a ### instabul ignore ... ### pragma.
     * Note that if a function is not ignored the skip field will be
     * missing entirely.
     */
    fnMap: {
        [key: string]: FunctionMap;
    };
    /**
     * Hash of function counts, where keys are function IDs.
     */
    f: {
        [key: string]: number;
    };
}
export interface CodeMirrorSelection {
    anchor: {
        line: number;
        ch: number;
    };
    head: {
        line: number;
        ch: number;
    };
}
export interface iCoverageFile {
    fileName: string;
    transpiledExtension: string;
    transpiledPath: string;
    transpiledCode: string;
    sourcePath: string;
    sourceCode: string;
    sourcePathExtension: string;
    scriptCoverage: inspector.Profiler.ScriptCoverage;
    coverage: {
        [key: string]: v8Coverage;
    };
    statementPercentage: number;
    functionPercentage: number;
    branchPercentage: number;
    selections: CodeMirrorSelection[];
}
