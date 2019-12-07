import { Apparatus } from "../../src";
import { Queue } from "../../src/commons/queue";

export class SuiteQueue {

    public descriptions = {
        suite: "Handles everything is the queue file",
        queuePushTest: "it should be able to push items into the queue and be executed"
    }

    public async controller({ test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.queuePushTest))
    }

    public async queuePushTest({ expect, spotlight }: Apparatus) {
        return new Promise((done, error) => {
            let number: string = "";
            const queue = new Queue()
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "one"
                    qdone();
                })
            })
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "two";
                    qdone();
                })
            })
            queue.push(() => {
                return new Promise((qdone, error) => {
                    number = "three";
                    qdone();

                })
            })
            queue.push(() => {
                return new Promise((qdone) => {
                    try {
                        expect(number === "three").equals(true);
                    } catch (err) {
                        error(err);
                    }
                    done();
                    qdone();
                })
            })
        })
    }
}
