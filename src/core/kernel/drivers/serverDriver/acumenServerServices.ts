import { IncomingMessage, ServerResponse } from "http";

import { match } from "../../../../commons/coolKids";
import { iClientManifest } from "../../../../contracts/base/iClientManifest";
import { AcumenServer } from "./acumenServer";
import { staticServer } from "./staticServer";

export class AcumenServerServices {

    public constructor(private server: AcumenServer) { }

    public serverHandler() {
        return (request: IncomingMessage, response: ServerResponse) => {
            match()
                .when(request.url === "/manifest" && request.method === "GET", () => this.getManifest(request, response))
                .when(request.url === "/code-counter" && request.method === "POST", () => this.codeCounter(request, response))
                .default(() => staticServer(request, response))
        }
    }

    public getJson<Context>(request: IncomingMessage): Promise<Context> {
        return new Promise((resolve, reject) => {
            let buffer = ""
            request.on("data", (chunk: Buffer) => buffer += chunk.toString("utf-8"))
            request.on("end", () => resolve(JSON.parse(buffer)))
            request.on("error", (err) => reject(err));
        })
    }

    public sendJson(response: ServerResponse, status: number, data: any, ) {
        response.writeHead(status, { "content-type": "application/json" })
        response.end(JSON.stringify(data))
    }

    public getManifest(request: IncomingMessage, response: ServerResponse) {
        const manifest: iClientManifest = {
            currentWorkingDirectory: process.cwd(),
            entries: this.server.entries,
            coverageOptions: this.server.coverageOptions
        }
        this.sendJson(response, 200, manifest);
    }

    public codeCounter(request: IncomingMessage, response: ServerResponse) {
        this.getJson(request)
            .then(data => {
                this.sendJson(response, 200, data);
            })
    }
}
