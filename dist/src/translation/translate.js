"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestTranslator_1 = require("./requestTranslator");
const responseTranslator_1 = require("./responseTranslator");
function translateRequest(request) {
    return new requestTranslator_1.RequestTranslator(request);
}
exports.translateRequest = translateRequest;
function translateResponse(response) {
    return new responseTranslator_1.ResponseTranslator(response);
}
exports.translateResponse = translateResponse;
//# sourceMappingURL=translate.js.map