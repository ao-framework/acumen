import { TestInstance } from "./testInstance";
/**
 * The failure instance is type of test instance
 */
export declare class FailureInstance extends TestInstance {
    /**
     * Set the type to failure
     */
    type: "failure";
    /**
     * The error stack trace as an array for easy transport
     */
    error: string[];
    /**
     * Helper method to set the error property member
     * @param error
     */
    setError(error: Error | any): void;
}
