#!/usr/bin/env node
import { Cli } from "./cli";

/**
 * Root controller for the cli wiring with npm.
 */
const cli = new Cli(process.argv)
cli.callConcept()
