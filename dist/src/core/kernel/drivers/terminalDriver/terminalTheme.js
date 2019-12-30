"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../commons/validators");
function keyword(word) {
    return `<cyan><bold>${word}</bold></cyan>`;
}
exports.keyword = keyword;
function entityName(name) {
    return `<cyan>${name}</cyan>`;
}
exports.entityName = entityName;
function description(lines, context, offset = "") {
    if (validators_1.stringHasLength(context.description)) {
        lines.push(`${offset}<magenta>${context.description}</magenta>`);
    }
}
exports.description = description;
function breadCrumbs(lines, context, offset = "") {
    context.forEach(crumb => {
        lines.push(offset + "<gray>></gray> " + `<cyan>${crumb}</cyan>`);
    });
}
exports.breadCrumbs = breadCrumbs;
function error(lines, error, offset = "") {
    if (Array.isArray(error)) {
        error.forEach(line => {
            lines.push(`${offset}<red>${line}</red>`);
        });
    }
}
exports.error = error;
function openBracket() {
    return `<gray>{</gray>`;
}
exports.openBracket = openBracket;
function closeBracket() {
    return `<gray>}</gray>`;
}
exports.closeBracket = closeBracket;
function column(consoleEnvironment) {
    if (consoleEnvironment.useStructureGuideLines) {
        return `<gray>|</gray>`;
    }
    return ``;
}
exports.column = column;
function oneSpace() {
    return " ";
}
exports.oneSpace = oneSpace;
function oneTab() {
    return "  ";
}
exports.oneTab = oneTab;
//# sourceMappingURL=terminalTheme.js.map