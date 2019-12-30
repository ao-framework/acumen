import { iVariableDiagram } from "../../../../contracts/base/iVariableDiagram";
export declare class Warning {
    /**
     * The message for the warning
     */
    message: string;
    /**
     * The data given to assist with the warning
     */
    data: iVariableDiagram;
    /**
     * The time that this warning was recorded
     */
    time: number;
    /**
     * Factory method to create a warning
     * @param message
     * @param data
     */
    static make(message: string, data: any): Warning;
}
