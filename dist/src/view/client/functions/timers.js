"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(count) {
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, count);
    });
}
exports.delay = delay;
//# sourceMappingURL=timers.js.map