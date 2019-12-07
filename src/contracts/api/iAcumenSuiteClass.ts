import { iAcumenSuiteConstructor } from "./iAcumenSuiteConstructor";

export interface iAcumenSuiteClass {
    name?: string;
    timeouts?: { [key: string]: number }
    descriptions?: { [key: string]: string }
    suites?: iAcumenSuiteConstructor[];
    controller(relay: any, ...args: any[]): any;
}
