import { iKeyValuePair } from "../base/iKeyValuePair";
import { iEntryData } from "./iEntryData";

export interface iBaseHeaders {
    entry: iEntryData
    data: iKeyValuePair<string>
}
