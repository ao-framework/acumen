import { iCoverageTableFormat } from "../../../../contracts/coverage/helpers/iCoverageTableFormat";
import { iCoverageDirectory } from "../../../../contracts/coverage/model/iCoverageDirectory";
import { iCoverageFile } from "../../../../contracts/coverage/model/iCoverageFile";
import { iCoverageResponseData } from "../../../../contracts/coverage/model/iCoverageResponseData";
import { KernelModules } from "../../kernelModules";

export class CoverageModule {

    public constructor(private modules: KernelModules) { }

    public calcTotalFromFiles(data: iCoverageResponseData) {
        const report = {
            fileCount: 0,
            statementTotal: 0,
            functionsTotal: 0,
            branchesTotal: 0,
            statementAverage: 0,
            functionsAverage: 0,
            branchesAverage: 0,
            statementAverageString: "",
            functionsAverageString: "",
            branchesAverageString: ""
        }
        function upFloat(n: number) { return n * 100 }
        function downFloat(n: number) { return n / 100 }
        function runDirectory(directory: iCoverageDirectory) {
            directory.directories.forEach(dir => runDirectory(dir))
            directory.files.forEach(file => {
                report.statementTotal += upFloat(file.statementPercentage)
                report.functionsTotal += upFloat(file.functionPercentage)
                report.branchesTotal += upFloat(file.branchPercentage)
                report.fileCount++;
            })
        }
        runDirectory(data.directory);
        report.statementAverage = downFloat(report.statementTotal) / report.fileCount;
        report.functionsAverage = downFloat(report.functionsTotal) / report.fileCount
        report.branchesAverage = downFloat(report.branchesTotal) / report.fileCount
        report.statementAverageString = report.statementAverage.toFixed(2) + "%"
        report.functionsAverageString = report.functionsAverage.toFixed(2) + "%"
        report.branchesAverageString = report.branchesAverage.toFixed(2) + "%"
        return report;
    }

    public coverageToTable(data: iCoverageResponseData): iCoverageTableFormat[] {
        return this.coverageDirectoryToTable(data.directory);
    }

    public coverageDirectoryToTable(directory: iCoverageDirectory) {
        const files: iCoverageTableFormat[] = [];
        directory.directories.map(dir => this.coverageDirectoryToTable(dir))
            .forEach(fileCollection => files.push(...fileCollection))
        directory.files.map(file => this.coverageFiletoTable(directory.path, file))
            .forEach(format => files.push(format))
        return files;
    }

    public coverageFiletoTable(directoryPath: string, file: iCoverageFile) {
        const format = {} as iCoverageTableFormat;
        format.fileName = file.fileName + file.sourcePathExtension;
        format.path = file.sourcePath;
        format.directory = directoryPath;
        format.functionPercentage = file.functionPercentage.toFixed(2)
        format.branchPercentage = file.branchPercentage.toFixed(2)
        format.statementPercentage = file.statementPercentage.toFixed(2)
        format.functionCount = file.functionPercentage
        format.branchCount = file.branchPercentage
        format.statementCount = file.statementPercentage
        return format;
    }
}
