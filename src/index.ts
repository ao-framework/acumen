import { bootEnvironment } from "./core/bootEnvironment";
import { conceptualize } from "./core/configuration/api/conceptualizationApi";
import { JsonEnvironment } from "./core/configuration/jsonEnvironment";
import { MarkdownEnvironment } from "./core/configuration/markdownEnvironment";
import { ServerEnvironment } from "./core/configuration/serverEnvironment";
import { TerminalEnvironment } from "./core/configuration/terminalEnvironment";
import { TestEnvironment } from "./core/configuration/testEnvironment";
import { Kernel } from "./core/kernel/kernel";
import { browser, suite, suiteFromClass } from "./entryPoint/api/acumen";
import { bootstrapEntrypoint } from "./entryPoint/bootstrap";
import { Apparatus } from "./entryPoint/runtime/apparatus/apparatus";

export default {
    conceptualize,
    suite,
    suiteFromClass,
    Apparatus,
    TestEnvironment,
    MarkdownEnvironment,
    JsonEnvironment,
    ServerEnvironment,
    TerminalEnvironment,
    Kernel,
    bootEnvironment,
    browser,
}

export {
    conceptualize,
    suite,
    suiteFromClass,
    Apparatus,
    TestEnvironment,
    MarkdownEnvironment,
    JsonEnvironment,
    ServerEnvironment,
    TerminalEnvironment,
    Kernel,
    bootEnvironment,
    browser,
}

let bootstrapCalledFlag: boolean = false;

Object.defineProperty(exports, "suiteFromClass", {
    get() {
        if (!bootstrapCalledFlag) {
            bootstrapCalledFlag = true;
            bootstrapEntrypoint()
        }
        return suiteFromClass
    }
})

Object.defineProperty(exports, "suite", {
    get() {
        if (!bootstrapCalledFlag) {
            bootstrapCalledFlag = true;
            bootstrapEntrypoint()
        }
        return suite
    }
})

