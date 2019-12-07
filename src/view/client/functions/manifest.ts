import { Client } from "client/client";
import { EntryFile } from "client/entry/entryFile";

import { iClientManifest } from "../../../contracts/base/iClientManifest";

export function getManifest(): Promise<iClientManifest> {
    return new Promise((done, error) => {
        const http = new XMLHttpRequest();
        http.open("GET", "/manifest")
        http.onload = function () {
            if (http.status === 200) {
                done(JSON.parse(http.responseText));
            } else {
                error(http);
            }
        }
        http.send();
    })
}


export function setupManifest(client: Client, manifest: iClientManifest) {
    client.currentWorkingDirectory = manifest.currentWorkingDirectory;
    manifest.entries.forEach(entry => {
        const entryFile = new EntryFile(entry, manifest.currentWorkingDirectory);
        client.entries[entryFile.base64] = entryFile;
        client.coverageOptions = manifest.coverageOptions;
    })
}
