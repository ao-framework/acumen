import { createHash } from "crypto";

import { TestInstance } from "./testInstance";

/**
 * Converts the breadcrumb path to a SHA1 check sum
 * to act as the ID for the test instance
 * @param instance 
 */
export function generateID(instance: TestInstance) {
    instance.id = createHash("sha1")
        .update(instance.breadCrumbs.join())
        .digest("hex")
}
