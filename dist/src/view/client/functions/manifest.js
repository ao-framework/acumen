"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entryFile_1 = require("client/entry/entryFile");
function getManifest() {
    return new Promise((done, error) => {
        const http = new XMLHttpRequest();
        http.open("GET", "/manifest");
        http.onload = function () {
            if (http.status === 200) {
                done(JSON.parse(http.responseText));
            }
            else {
                error(http);
            }
        };
        http.send();
    });
}
exports.getManifest = getManifest;
function setupManifest(client, manifest) {
    client.currentWorkingDirectory = manifest.currentWorkingDirectory;
    manifest.entries.forEach(entry => {
        const entryFile = new entryFile_1.EntryFile(entry, manifest.currentWorkingDirectory);
        client.entries[entryFile.base64] = entryFile;
        client.coverageOptions = manifest.coverageOptions;
    });
}
exports.setupManifest = setupManifest;
//# sourceMappingURL=manifest.js.map