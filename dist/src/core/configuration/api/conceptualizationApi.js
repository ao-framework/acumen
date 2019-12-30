"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonEnvironment_1 = require("../jsonEnvironment");
const markdownEnvironment_1 = require("../markdownEnvironment");
const serverEnvironment_1 = require("../serverEnvironment");
const terminalEnvironment_1 = require("../terminalEnvironment");
const jsonEnvironmentApi_1 = require("./jsonEnvironmentApi");
const markdownEnvironmentApi_1 = require("./markdownEnvironmentApi");
const serverEnvironmentApi_1 = require("./serverEnvironmentApi");
const terminalEnvironmentApi_1 = require("./terminalEnvironmentApi");
const evs = new WeakMap();
class ConceptualizationApi {
    constructor(ev) {
        evs.set(this, ev);
    }
    getEnvironment() {
        return evs.get(this);
    }
    terminalEnvironment(handler) {
        const terminal = new terminalEnvironment_1.TerminalEnvironment();
        evs.get(this).terminalEnvironments.push(terminal);
        handler(new terminalEnvironmentApi_1.TerminalEnvironmentApi(terminal));
        return this;
    }
    jsonEnvironment(handler) {
        const json = new jsonEnvironment_1.JsonEnvironment();
        evs.get(this).jsonEnvironments.push(json);
        handler(new jsonEnvironmentApi_1.JsonEnvironmentApi(json));
        return this;
    }
    serverEnvironment(handler) {
        const server = new serverEnvironment_1.ServerEnvironment();
        evs.get(this).serverEnvironments.push(server);
        handler(new serverEnvironmentApi_1.ServerEnvironmentApi(server));
        return this;
    }
    markdownEnvironment(handler) {
        const markdown = new markdownEnvironment_1.MarkdownEnvironment();
        evs.get(this).markdownEnvironments.push(markdown);
        handler(new markdownEnvironmentApi_1.MarkdownEnvironmentApi(markdown));
        return this;
    }
}
exports.ConceptualizationApi = ConceptualizationApi;
function conceptualize(ev) {
    return new ConceptualizationApi(ev);
}
exports.conceptualize = conceptualize;
//# sourceMappingURL=conceptualizationApi.js.map