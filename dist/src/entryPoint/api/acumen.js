"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const suite_1 = require("../model/suite/suite");
const suiteApi_1 = require("./suiteApi/suiteApi");
const suiteClassApi_1 = require("./suiteClassApi/suiteClassApi");
/**
 * Provide a name of suite. It will create an instance of the SuiteApi
 * and return it. This particular api is used when a functional approach
 * is desired.
 * @param name
 */
function suite(name) {
    const suite = suite_1.Suite.make({ name });
    return new suiteApi_1.SuiteApi(suite);
}
exports.suite = suite;
/**
 * Provide a Acumen Suite Constructor as an argument. It will create the instance
 * and covert the constructor into a suite. It will return an instance of the
 * SuiteClassApi. The is the primary Object Oriented way creating test.
 * @param constructor
 */
function suiteFromClass(constructor) {
    return new suiteClassApi_1.SuiteClassApi(constructor);
}
exports.suiteFromClass = suiteFromClass;
let windowGlobals = [];
/**
 * Provide a list items for the browser's Window object you would like globalized (optional), a html string
 * for the browser state (optional), and an url for the browser (optional). It will use JSDOM to make the browser
 * usable globally. If you ever need to wipe the state, recall the function again. It will remove all previous
 * globals and give you a blank slate. Tip: only use this for small things. If you need something more extensive,
 * use something like puppeteer from Google.
 * @param globals
 * @param html
 * @param url
 */
function browser(globals = [], html = "", url = "http://localhost") {
    windowGlobals.forEach(exported => { delete globals[exported]; });
    windowGlobals = globals;
    const jsdom = new jsdom_1.JSDOM(html, { url });
    global["window"] = jsdom.window;
    global["document"] = jsdom.window.document;
    globals.forEach(g => { global[g] = jsdom.window[g]; });
}
exports.browser = browser;
//# sourceMappingURL=acumen.js.map