"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestModule {
    constructor(modules) {
        this.modules = modules;
    }
    getBaseHeadersForEntry(entry) {
        return {
            data: {},
            entry: {
                path: entry,
                base64: Buffer.from(entry, "utf-8").toString("base64"),
                length: entry.length
            }
        };
    }
}
exports.RequestModule = RequestModule;
//# sourceMappingURL=requestModule.js.map