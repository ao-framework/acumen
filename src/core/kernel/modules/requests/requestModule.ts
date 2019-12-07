import { iBaseHeaders } from "../../../../contracts/headers/iBaseHeaders";
import { KernelModules } from "../../kernelModules";

export class RequestModule {
    public constructor(private modules: KernelModules) { }

    public getBaseHeadersForEntry(entry: string): iBaseHeaders {
        return {
            data: {},
            entry: {
                path: entry,
                base64: Buffer.from(entry, "utf-8").toString("base64"),
                length: entry.length
            }
        }
    }
}
