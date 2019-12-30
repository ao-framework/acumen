"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convert_source_map_1 = tslib_1.__importDefault(require("convert-source-map"));
const fs_1 = require("fs");
const path_1 = require("path");
const v8_to_istanbul_1 = tslib_1.__importDefault(require("v8-to-istanbul"));
async function findScriptCoverage(directory, table) {
    for (let file of directory.files) {
        file.scriptCoverage = table[file.transpiledPath];
        if (file.scriptCoverage) {
            await loadfile(file).then(() => {
                let firstTaken = false;
                for (let iterator in file.coverage) {
                    if (!firstTaken) {
                        firstTaken = true;
                        file.sourcePath = file.coverage[iterator].path;
                        file.sourcePathExtension = file.sourcePath.split(".").pop();
                        file.sourceCode = fs_1.readFileSync(file.sourcePath, "utf8");
                    }
                }
            });
            file.transpiledCode = fs_1.readFileSync(file.transpiledPath, "utf8");
        }
        else {
            file.scriptCoverage = null;
            file.transpiledCode = fs_1.readFileSync(file.transpiledPath, "utf8");
            const map = convert_source_map_1.default.fromSource(file.transpiledCode) || convert_source_map_1.default.fromMapFileSource(file.transpiledCode, path_1.dirname(file.transpiledPath));
            if (map && map.sourcemap && Array.isArray(map.sourcemap.sources)) {
                map.sourcemap.sources.forEach(source => {
                    const originalPath = path_1.join(path_1.dirname(file.transpiledPath), source);
                    file.sourcePath = originalPath;
                    file.sourcePathExtension = originalPath.split(".").pop();
                    if (fs_1.existsSync(originalPath)) {
                        file.sourceCode = fs_1.readFileSync(originalPath, "utf8");
                    }
                });
            }
        }
        getSelections(file);
        getPercentages(file);
    }
    for (let dir of directory.directories) {
        await findScriptCoverage(dir, table);
    }
}
exports.findScriptCoverage = findScriptCoverage;
async function loadfile(file) {
    const converter = v8_to_istanbul_1.default(file.transpiledPath);
    return converter.load().then(() => {
        converter.applyCoverage(file.scriptCoverage.functions);
        file.coverage = converter.toIstanbul();
    });
}
function getFirstFileFromCoverage(file) {
    if (file.coverage) {
        const [first] = Object.keys(file.coverage);
        return file.coverage[first];
    }
    return null;
}
exports.getFirstFileFromCoverage = getFirstFileFromCoverage;
function getStatementPercentage(coverage) {
    let totalCount = 0;
    let runCount = 0;
    for (var iterator in coverage.statementMap) {
        totalCount++;
        if (coverage.s[iterator] > 0) {
            runCount++;
        }
    }
    return (((runCount / totalCount) * 100) || 0);
}
exports.getStatementPercentage = getStatementPercentage;
function getFunctionPercentage(coverage) {
    let totalCount = 0;
    let runCount = 0;
    for (var iterator in coverage.fnMap) {
        totalCount++;
        if (coverage.f[iterator] > 0) {
            runCount++;
        }
    }
    return (((runCount / totalCount) * 100) || 0);
}
exports.getFunctionPercentage = getFunctionPercentage;
function getBranchPercentage(coverage) {
    let totalCount = 0;
    let runCount = 0;
    for (var iterator in coverage.branchMap) {
        totalCount++;
        coverage.b[iterator].forEach(branchCount => {
            if (branchCount > 0) {
                runCount++;
            }
        });
    }
    return (((runCount / totalCount) * 100) || 0);
}
exports.getBranchPercentage = getBranchPercentage;
function getPercentages(file) {
    const coverage = getFirstFileFromCoverage(file);
    file.statementPercentage = 0;
    file.functionPercentage = 0;
    file.branchPercentage = 0;
    if (coverage) {
        file.statementPercentage = getStatementPercentage(coverage);
        file.functionPercentage = getFunctionPercentage(coverage);
        file.branchPercentage = getBranchPercentage(coverage);
    }
}
exports.getPercentages = getPercentages;
function getSelections(file) {
    file.selections = [];
    const coverage = getFirstFileFromCoverage(file);
    if (coverage) {
        for (var iterator in coverage.statementMap) {
            if (coverage.s[iterator] === 0) {
                const start = coverage.statementMap[iterator].start;
                const end = coverage.statementMap[iterator].end;
                file.selections.push({
                    anchor: {
                        line: start.line - 1,
                        ch: start.column
                    },
                    head: {
                        line: end.line - 1,
                        ch: end.column
                    }
                });
            }
        }
        for (var iterator in coverage.branchMap) {
            coverage.b[iterator].forEach((branchCount, index) => {
                if (branchCount === 0) {
                    const start = coverage.branchMap[iterator].locations[index].start;
                    const end = coverage.branchMap[iterator].locations[index].end;
                    file.selections.push({
                        anchor: {
                            line: start.line - 1,
                            ch: start.column
                        },
                        head: {
                            line: end.line - 1,
                            ch: end.column
                        }
                    });
                }
            });
        }
        for (var iterator in coverage.fnMap) {
            if (coverage.f[iterator] === 0) {
                const start = coverage.fnMap[iterator].loc.start;
                const end = coverage.fnMap[iterator].loc.end;
                file.selections.push({
                    anchor: {
                        line: start.line - 1,
                        ch: start.column
                    },
                    head: {
                        line: end.line - 1,
                        ch: end.column
                    }
                });
            }
        }
    }
}
exports.getSelections = getSelections;
//# sourceMappingURL=coverageStats.js.map