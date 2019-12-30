import { iVariableDiagram } from "../../../../contracts/base/iVariableDiagram";
export declare class Spotlight {
    /**
     * The name of the spotlight
     */
    name: string;
    /**
     * The data to display
     */
    data: iVariableDiagram;
    /**
     * The time that the spotlight was captured
     */
    time: number;
    /**
     * Factory method to create a spotlight
     * @param name
     * @param data
     */
    static make(name: string, data: any): Spotlight;
}
