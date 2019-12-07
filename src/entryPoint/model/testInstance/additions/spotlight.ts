import { performance } from "perf_hooks";

import { diagram } from "../../../../commons/variableDiagram";
import { iVariableDiagram } from "../../../../contracts/base/iVariableDiagram";

export class Spotlight {

    /**
     * The name of the spotlight
     */
    public name: string;

    /**
     * The data to display
     */
    public data: iVariableDiagram;

    /**
     * The time that the spotlight was captured
     */
    public time: number = performance.now();

    /**
     * Factory method to create a spotlight
     * @param name 
     * @param data 
     */
    static make(name: string, data: any) {
        const spotlight = new Spotlight();
        spotlight.name = name;
        spotlight.data = diagram(data);
        return spotlight;
    }
}
