"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requests = new WeakMap();
class RequestTranslator {
    constructor(request) {
        requests.set(this, request);
    }
}
exports.RequestTranslator = RequestTranslator;
//# sourceMappingURL=requestTranslator.js.map