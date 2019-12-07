import { stringHasLength } from "../../../../commons/validators";
import { ConsoleEnvironment } from "../../../configuration/base/consoleEnvironment";

export interface iHasDescription {
    description: string;
}

export function keyword(word: string) {
    return `<cyan><bold>${word}</bold></cyan>`;
}

export function entityName(name: string) {
    return `<cyan>${name}</cyan>`;
}

export function description(lines: string[], context: iHasDescription, offset: string = "") {
    if (stringHasLength(context.description)) {
        lines.push(`${offset}<magenta>${context.description}</magenta>`)
    }
}

export function breadCrumbs(lines: string[], context: string[], offset: string = "") {
    context.forEach(crumb => {
        lines.push(offset + "<gray>></gray> " + `<cyan>${crumb}</cyan>`);
    })
}

export function error(lines: string[], error: string[], offset: string = "") {
    if (Array.isArray(error)) {
        error.forEach(line => {
            lines.push(`${offset}<red>${line}</red>`)
        })
    }
}

export function openBracket() {
    return `<gray>{</gray>`
}

export function closeBracket() {
    return `<gray>}</gray>`
}

export function column(consoleEnvironment: ConsoleEnvironment) {
    if (consoleEnvironment.useStructureGuideLines) {
        return `<gray>|</gray>`
    }
    return ``;
}

export function oneSpace() {
    return " "
}

export function oneTab() {
    return "  "
}
