import { JSDOM } from "jsdom";

import { iAcumenSuiteConstructor } from "../../contracts/api/iAcumenSuiteConstructor";
import { Suite } from "../model/suite/suite";
import { SuiteApi } from "./suiteApi/suiteApi";
import { SuiteClassApi } from "./suiteClassApi/suiteClassApi";

/**
 * Provide a name of suite. It will create an instance of the SuiteApi
 * and return it. This particular api is used when a functional approach
 * is desired.
 * @param name 
 */
export function suite(name: string) {
    const suite = Suite.make({ name })
    return new SuiteApi(suite);
}

/**
 * Provide a Acumen Suite Constructor as an argument. It will create the instance
 * and covert the constructor into a suite. It will return an instance of the 
 * SuiteClassApi. The is the primary Object Oriented way creating test.
 * @param constructor 
 */
export function suiteFromClass(constructor: iAcumenSuiteConstructor) {
    return new SuiteClassApi(constructor);
}

let windowGlobals: string[] = []

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
export function browser(globals: string[] = [], html: string = "", url: string = "http://localhost") {
    windowGlobals.forEach(exported => { delete globals[exported] })
    windowGlobals = globals;
    const jsdom = new JSDOM(html, { url })
    global["window"] = jsdom.window;
    global["document"] = jsdom.window.document;
    globals.forEach(g => { global[g] = jsdom.window[g] });
}
