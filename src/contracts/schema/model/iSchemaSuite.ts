import { iSchemaController } from "./iSchemaController";
import { iSchemaTest } from "./iSchemaTest";

export interface iSchemaSuite {
    name: string;
    description: string;
    breadCrumbs: string[];
    tests: { [key: string]: iSchemaTest }
    suites: { [key: string]: iSchemaSuite }
    controller: iSchemaController;
}
