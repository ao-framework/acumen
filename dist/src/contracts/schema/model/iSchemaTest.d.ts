import { iSchemaSuiteInformation } from "./iSchemaSuiteInformation";
export interface iSchemaTest {
    command: string;
    description: string;
    timeout: number;
    hasFunction: boolean;
    functionCode: string;
    suiteInformation: iSchemaSuiteInformation;
    breadCrumbs: string[];
}
