"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ansiStyles = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
};
function openTag(tagName) {
    if (exports.ansiStyles[tagName] === undefined) {
        return `<${tagName}>`;
    }
    return `\u001b[${exports.ansiStyles[tagName][0]}m`;
}
exports.openTag = openTag;
function closeTag(tagName) {
    if (exports.ansiStyles[tagName] === undefined) {
        return `</${tagName}>`;
    }
    return `\u001b[${exports.ansiStyles[tagName][1]}m`;
}
exports.closeTag = closeTag;
function stripOpenTag(tagName) {
    if (exports.ansiStyles[tagName] === undefined) {
        return `<${tagName}>`;
    }
    return "";
}
exports.stripOpenTag = stripOpenTag;
function stripClosingTag(tagName) {
    if (exports.ansiStyles[tagName] === undefined) {
        return `</${tagName}>`;
    }
    return "";
}
exports.stripClosingTag = stripClosingTag;
//# sourceMappingURL=ansiFormatter.js.map