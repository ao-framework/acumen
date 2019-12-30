#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
/**
 * Root controller for the cli wiring with npm.
 */
const cli = new cli_1.Cli(process.argv);
cli.callConcept();
//# sourceMappingURL=loader.js.map