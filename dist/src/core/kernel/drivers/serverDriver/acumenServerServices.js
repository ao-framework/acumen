"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coolKids_1 = require("../../../../commons/coolKids");
const staticServer_1 = require("./staticServer");
class AcumenServerServices {
    constructor(server) {
        this.server = server;
    }
    serverHandler() {
        return (request, response) => {
            coolKids_1.match()
                .when(request.url === "/manifest" && request.method === "GET", () => this.getManifest(request, response))
                .when(request.url === "/code-counter" && request.method === "POST", () => this.codeCounter(request, response))
                .default(() => staticServer_1.staticServer(request, response));
        };
    }
    getJson(request) {
        return new Promise((resolve, reject) => {
            let buffer = "";
            request.on("data", (chunk) => buffer += chunk.toString("utf-8"));
            request.on("end", () => resolve(JSON.parse(buffer)));
            request.on("error", (err) => reject(err));
        });
    }
    sendJson(response, status, data) {
        response.writeHead(status, { "content-type": "application/json" });
        response.end(JSON.stringify(data));
    }
    getManifest(request, response) {
        const manifest = {
            currentWorkingDirectory: process.cwd(),
            entries: this.server.entries,
            coverageOptions: this.server.coverageOptions
        };
        this.sendJson(response, 200, manifest);
    }
    codeCounter(request, response) {
        this.getJson(request)
            .then(data => {
            this.sendJson(response, 200, data);
        });
    }
}
exports.AcumenServerServices = AcumenServerServices;
//# sourceMappingURL=acumenServerServices.js.map