import { iQueueable } from "../contracts/base/iQueueable";

export class Queue {

    /**
     * Local member to hold queueable items for later use.
     */
    private queue: iQueueable[] = [];

    /**
     * Local member to tell if the queue processor currently
     * has a batch of queueable items running.
     */
    private processing: boolean = false;

    /**
     * Provide a queueable item as an argument. It will be pushed automatically 
     * into the queue list. If the processing flag is set to false. It will automatically
     * call process so that the processor can it this task out the door.
     * @param queueable 
     */
    public push(queueable: iQueueable) {
        this.queue.push(queueable);
        if (!this.processing) {
            this.process()
        }
    }

    /**
     * Local helper method to clean the queue of items and
     * return them to processor for completion. The end goal
     * is that things get done and the queue stays clean.
     */
    private makeStack(): iQueueable[] {
        let stack = this.queue;
        this.queue = [];
        return stack;
    }

    /**
     * First off, it will set the processing flag so that nothing else
     * gets called. Secondly, it make a stack from the queue as it stands.
     * It will loop through every item in the stack and execute it sequentially.
     * When all of the stack item are resolved, it will set the processing back
     * to false. Before returning it will check to see if any new items have been
     * added to the queue. If so, it will recall itself.
     */
    private async process() {
        this.processing = true;
        let stack = this.makeStack();
        for (let queueable of stack) {
            try {
                await queueable()
            } catch (err) {
                console.warn(err);
            }
        }
        this.processing = false;
        stack = null;
        if (this.queue.length > 0) { this.process() }
    }

}
