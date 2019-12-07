import sourceMap from "convert-source-map";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import v8toIstanbul from "v8-to-istanbul";

import { iCoverageTable } from "../../../contracts/coverage/helpers/iCoverageTable";
import { iCoverageDirectory } from "../../../contracts/coverage/model/iCoverageDirectory";
import { iCoverageFile, v8Coverage } from "../../../contracts/coverage/model/iCoverageFile";

export async function findScriptCoverage(directory: iCoverageDirectory, table: iCoverageTable) {
    for (let file of directory.files) {
        file.scriptCoverage = table[file.transpiledPath]
        if (file.scriptCoverage) {
            await loadfile(file).then(() => {
                let firstTaken: boolean = false;
                for (let iterator in file.coverage) {
                    if (!firstTaken) {
                        firstTaken = true;
                        file.sourcePath = file.coverage[iterator].path;
                        file.sourcePathExtension = file.sourcePath.split(".").pop();
                        file.sourceCode = readFileSync(file.sourcePath, "utf8")
                    }
                }
            })
            file.transpiledCode = readFileSync(file.transpiledPath, "utf8");
        } else {
            file.scriptCoverage = null;
            file.transpiledCode = readFileSync(file.transpiledPath, "utf8")
            const map = sourceMap.fromSource(file.transpiledCode) || sourceMap.fromMapFileSource(file.transpiledCode, dirname(file.transpiledPath))
            if (map && map.sourcemap && Array.isArray(map.sourcemap.sources)) {
                map.sourcemap.sources.forEach(source => {
                    const originalPath = join(dirname(file.transpiledPath), source);
                    file.sourcePath = originalPath
                    file.sourcePathExtension = originalPath.split(".").pop();
                    if (existsSync(originalPath)) {
                        file.sourceCode = readFileSync(originalPath, "utf8");
                    }
                })
            }
        }
        getSelections(file);
        getPercentages(file);
    }
    for (let dir of directory.directories) {
        await findScriptCoverage(dir, table)
    }
}


async function loadfile(file: iCoverageFile) {
    const converter = v8toIstanbul(file.transpiledPath)
    return converter.load().then(() => {
        converter.applyCoverage(file.scriptCoverage.functions)
        file.coverage = <{ [key: string]: v8Coverage }><unknown>converter.toIstanbul();
    })
}

export function getFirstFileFromCoverage(file: iCoverageFile) {
    if (file.coverage) {
        const [first] = Object.keys(file.coverage)
        return file.coverage[first];
    }
    return null;
}

export function getStatementPercentage(coverage: v8Coverage) {
    let totalCount = 0;
    let runCount = 0
    for (var iterator in coverage.statementMap) {
        totalCount++;
        if (coverage.s[iterator] > 0) {
            runCount++;
        }
    }
    return (((runCount / totalCount) * 100) || 0);
}

export function getFunctionPercentage(coverage: v8Coverage) {
    let totalCount = 0;
    let runCount = 0
    for (var iterator in coverage.fnMap) {
        totalCount++;
        if (coverage.f[iterator] > 0) {
            runCount++;
        }
    }
    return (((runCount / totalCount) * 100) || 0)
}

export function getBranchPercentage(coverage: v8Coverage) {
    let totalCount = 0;
    let runCount = 0
    for (var iterator in coverage.branchMap) {
        totalCount++;
        coverage.b[iterator].forEach(branchCount => {
            if (branchCount > 0) {
                runCount++
            }
        })
    }
    return (((runCount / totalCount) * 100) || 0)
}

export function getPercentages(file: iCoverageFile) {
    const coverage = getFirstFileFromCoverage(file);
    file.statementPercentage = 0;
    file.functionPercentage = 0;
    file.branchPercentage = 0;
    if (coverage) {
        file.statementPercentage = getStatementPercentage(coverage)
        file.functionPercentage = getFunctionPercentage(coverage);
        file.branchPercentage = getBranchPercentage(coverage);
    }
}

export function getSelections(file: iCoverageFile) {
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
                })
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
                    })
                }
            })
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
                })
            }
        }
    }
}

