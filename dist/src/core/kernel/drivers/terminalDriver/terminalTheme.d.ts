import { ConsoleEnvironment } from "../../../configuration/base/consoleEnvironment";
export interface iHasDescription {
    description: string;
}
export declare function keyword(word: string): string;
export declare function entityName(name: string): string;
export declare function description(lines: string[], context: iHasDescription, offset?: string): void;
export declare function breadCrumbs(lines: string[], context: string[], offset?: string): void;
export declare function error(lines: string[], error: string[], offset?: string): void;
export declare function openBracket(): string;
export declare function closeBracket(): string;
export declare function column(consoleEnvironment: ConsoleEnvironment): "" | "<gray>|</gray>";
export declare function oneSpace(): string;
export declare function oneTab(): string;
