import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageDirectory } from "../../../../contracts/coverage/model/iCoverageDirectory";
import { iCoverageFile } from "../../../../contracts/coverage/model/iCoverageFile";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { KernelModules } from "../../kernelModules";
export declare class CoverageModule {
    private modules;
    constructor(modules: KernelModules);
    calcTotalFromFiles(data: iCoverageResponseData): {
        fileCount: number;
        statementTotal: number;
        functionsTotal: number;
        branchesTotal: number;
        statementAverage: number;
        functionsAverage: number;
        branchesAverage: number;
        statementAverageString: string;
        functionsAverageString: string;
        branchesAverageString: string;
    };
    coverageToTable(data: iCoverageResponseData): iCoverageTableFormat[];
    coverageDirectoryToTable(directory: iCoverageDirectory): iCoverageTableFormat[];
    coverageFiletoTable(directoryPath: string, file: iCoverageFile): iCoverageTableFormat;
}
