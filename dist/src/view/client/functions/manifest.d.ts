import { Client } from "client/client";
import { iClientManifest } from "../../../contracts/base/iClientManifest";
export declare function getManifest(): Promise<iClientManifest>;
export declare function setupManifest(client: Client, manifest: iClientManifest): void;
