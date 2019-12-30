"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../../src/commons/queue");
class SuiteQueue {
    constructor() {
        this.descriptions = {
            suite: "Handles everything is the queue file",
            queuePushTest: "it should be able to push items into the queue and be executed"
        };
    }
    async controller({ test }) {
        return Promise.resolve()
            .then(() => test(this.queuePushTest));
    }
    async queuePushTest({ expect, spotlight }) {
        return new Promise((done, error) => {
            let number = "";
            const queue = new queue_1.Queue();
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "one";
                    qdone();
                });
            });
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "two";
                    qdone();
                });
            });
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "three";
                    qdone();
                });
            });
            queue.push(() => {
                return new Promise((qdone) => {
                    try {
                        expect(number === "three").equals(true);
                    }
                    catch (err) {
                        error(err);
                    }
                    done();
                    qdone();
                });
            });
        });
    }
}
exports.SuiteQueue = SuiteQueue;
//# sourceMappingURL=suite.queue.js.map