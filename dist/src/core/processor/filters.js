"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filesystemValidators_1 = require("../../commons/filesystemValidators");
function filterLines(lines) {
    const projectPath = filesystemValidators_1.relativeToProject().replace(/\\/g, "\\\\");
    const projectRegex = new RegExp(projectPath, "g");
    return lines.map(line => line.replace(projectRegex, "."));
}
exports.filterLines = filterLines;
//# sourceMappingURL=filters.js.map