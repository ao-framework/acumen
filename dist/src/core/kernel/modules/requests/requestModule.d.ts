import { iBaseHeaders } from "../../../../contracts/headers/iBaseHeaders";
import { KernelModules } from "../../kernelModules";
export declare class RequestModule {
    private modules;
    constructor(modules: KernelModules);
    getBaseHeadersForEntry(entry: string): iBaseHeaders;
}
