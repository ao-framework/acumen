"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testInstance_1 = require("./testInstance");
/**
 * The stub instance is type of test instance
 */
class StubInstance extends testInstance_1.TestInstance {
    constructor() {
        super(...arguments);
        this.type = "stub";
    }
}
exports.StubInstance = StubInstance;
//# sourceMappingURL=stubInstance.js.map