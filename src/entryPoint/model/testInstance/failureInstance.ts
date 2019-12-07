import { ensureError, splitError } from "../../../commons/errorHandling";
import { filterLines } from "../../../core/processor/filters";
import { TestInstance } from "./testInstance";

/**
 * The failure instance is type of test instance
 */
export class FailureInstance extends TestInstance {

    /**
     * Set the type to failure
     */
    type: "failure" = "failure";

    /**
     * The error stack trace as an array for easy transport
     */
    public error: string[] = [];

    /**
     * Helper method to set the error property member
     * @param error 
     */
    public setError(error: Error | any) {
        this.error = filterLines(splitError(ensureError(error)));
    }

}


