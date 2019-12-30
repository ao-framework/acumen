import { Apparatus } from "../../entryPoint/runtime/apparatus/apparatus";
export declare type iApparatusFunction = (apparatus: Apparatus, ...args: any[]) => any;
export declare type iApparatusFunctionWithReturn<Context> = (apparatus: Apparatus, ...args: any[]) => Context;
