"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CoverageModule {
    constructor(modules) {
        this.modules = modules;
    }
    calcTotalFromFiles(data) {
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
        };
        function upFloat(n) { return n * 100; }
        function downFloat(n) { return n / 100; }
        function runDirectory(directory) {
            directory.directories.forEach(dir => runDirectory(dir));
            directory.files.forEach(file => {
                report.statementTotal += upFloat(file.statementPercentage);
                report.functionsTotal += upFloat(file.functionPercentage);
                report.branchesTotal += upFloat(file.branchPercentage);
                report.fileCount++;
            });
        }
        runDirectory(data.directory);
        report.statementAverage = downFloat(report.statementTotal) / report.fileCount;
        report.functionsAverage = downFloat(report.functionsTotal) / report.fileCount;
        report.branchesAverage = downFloat(report.branchesTotal) / report.fileCount;
        report.statementAverageString = report.statementAverage.toFixed(2) + "%";
        report.functionsAverageString = report.functionsAverage.toFixed(2) + "%";
        report.branchesAverageString = report.branchesAverage.toFixed(2) + "%";
        return report;
    }
    coverageToTable(data) {
        return this.coverageDirectoryToTable(data.directory);
    }
    coverageDirectoryToTable(directory) {
        const files = [];
        directory.directories.map(dir => this.coverageDirectoryToTable(dir))
            .forEach(fileCollection => files.push(...fileCollection));
        directory.files.map(file => this.coverageFiletoTable(directory.path, file))
            .forEach(format => files.push(format));
        return files;
    }
    coverageFiletoTable(directoryPath, file) {
        const format = {};
        format.fileName = file.fileName + file.sourcePathExtension;
        format.path = file.sourcePath;
        format.directory = directoryPath;
        format.functionPercentage = file.functionPercentage.toFixed(2);
        format.branchPercentage = file.branchPercentage.toFixed(2);
        format.statementPercentage = file.statementPercentage.toFixed(2);
        format.functionCount = file.functionPercentage;
        format.branchCount = file.branchPercentage;
        format.statementCount = file.statementPercentage;
        return format;
    }
}
exports.CoverageModule = CoverageModule;
//# sourceMappingURL=coverageModule.js.map