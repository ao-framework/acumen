import { Apparatus } from "../../entryPoint/runtime/apparatus/apparatus";

export type iApparatusFunction = (apparatus: Apparatus, ...args: any[]) => any;
export type iApparatusFunctionWithReturn<Context> = (apparatus: Apparatus, ...args: any[]) => Context
