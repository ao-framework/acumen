import { performance } from "perf_hooks";

import { diagram } from "../../../../commons/variableDiagram";
import { iVariableDiagram } from "../../../../contracts/base/iVariableDiagram";

export class Warning {

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
    time: number = performance.now();

    /**
     * Factory method to create a warning
     * @param message 
     * @param data 
     */
    static make(message: string, data: any) {
        const warning = new Warning();
        warning.message = String(message);
        warning.data = diagram(data);
        return warning;
    }
}
