"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prettier = tslib_1.__importStar(require("prettier"));
/**
 * When code needs to be displayed in a view, this function
 * formats that code to take care of any weird spaces
 * @param code
 */
function formatCode(code) {
    return prettier.format(code, {
        semi: true,
        parser: "babel",
    });
}
exports.formatCode = formatCode;
//# sourceMappingURL=formatCode.js.map