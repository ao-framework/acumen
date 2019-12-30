"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
/**
 * Converts the breadcrumb path to a SHA1 check sum
 * to act as the ID for the test instance
 * @param instance
 */
function generateID(instance) {
    instance.id = crypto_1.createHash("sha1")
        .update(instance.breadCrumbs.join())
        .digest("hex");
}
exports.generateID = generateID;
//# sourceMappingURL=testInstanceLogic.js.map