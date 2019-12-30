"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responses = new WeakMap();
class ResponseTranslator {
    constructor(response) {
        responses.set(this, response);
    }
    whenMessage(handler) {
        const response = responses.get(this);
        if (response.url === "/message") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
    whenSchema(handler) {
        const response = responses.get(this);
        if (response.url === "/schema") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
    whenSnapshot(handler) {
        const response = responses.get(this);
        if (response.url === "/snapshot") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
    whenCoverage(handler) {
        const response = responses.get(this);
        if (response.url === "/coverage") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
    whenError(handler) {
        const response = responses.get(this);
        if (response.url === "/error") {
            if (typeof handler === "function") {
                handler(response);
            }
        }
    }
}
exports.ResponseTranslator = ResponseTranslator;
//# sourceMappingURL=responseTranslator.js.map