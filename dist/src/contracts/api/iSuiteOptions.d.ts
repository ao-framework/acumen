import { Suite } from "../../entryPoint/model/suite/suite";
export interface iSuiteOptions {
    name: string;
    parentSuite?: Suite;
    description?: string;
}
