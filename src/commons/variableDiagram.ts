import { iVariableDiagram } from "../contracts/base/iVariableDiagram";
import { Apparatus } from "../entryPoint/runtime/apparatus/apparatus";
import { isArray, isFunction, isObject } from "./validators";

/**
 * Provide a variable of any type as an argument. It will create a full diagram
 * of your variable in the structure of iVariableDiagram
 * @param variable 
 */
export function diagram(variable: any): iVariableDiagram {
    return diagramController(variable)
}

/**
 * Provide a variable of any type and list of pointer references as an argument. It will create 
 * a full diagram of your variable in the structure of iVariableDiagram. This is used as the
 * controller for the function diagram in case any major scoping changes are needed in the future.
 * @param variable 
 * @param references 
 */
export function diagramController(variable: any, references: any[] = []): iVariableDiagram {
    if (typeof variable === "bigint") { return diagramBigInt(variable, references) }
    if (typeof variable === "symbol") { return diagramSymbol(variable, references) }
    if (variable instanceof Apparatus) { return diagramApparatus(variable, references) }
    if (variable instanceof Date) { return diagramDate(variable, references) }
    if (isArray(variable)) { return diagramArray(variable, references) }
    if (isObject(variable)) { return diagramObject(variable, references) }
    if (isFunction(variable)) { return diagramFunction(variable) }
    return diagramPrimitive(variable);
}

export function diagramBigInt(variable: bigint, references: any[] = []) {
    if (references.includes(variable)) { return makeReference("BigInt", references.indexOf(variable)); }
    const diagram: iVariableDiagram = { instanceOf: "BigInt" }
    diagram.value = variable.toString();
    return diagram;
}

export function diagramSymbol(variable: symbol, references: any[] = []) {
    if (references.includes(variable)) { return makeReference("Symbol", references.indexOf(variable)); }
    const diagram: iVariableDiagram = { instanceOf: "Symbol" }
    diagram.value = variable.toString();
    return diagram;
}

/**
 * Provide a type string and an index number as arguments. It will create a reference iVariableDiagram.
 * The reference is basically reference to an pointer that has already been ran through and doesn't need to
 * again. This reference is used to cut down on memory consumption and also protect against max call stack exceptions.
 * @param type 
 * @param index 
 */
export function makeReference(type: string, index: number): iVariableDiagram {
    return { instanceOf: type, value: `[reference: ${index}]` }
}

/**
 * Provide an Apparatus instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param apparatus 
 * @param references 
 */
export function diagramApparatus(apparatus: Apparatus, references: any[]): iVariableDiagram {
    if (references.includes(apparatus)) { return makeReference("Apparatus", references.indexOf(apparatus)); }
    const diagram: iVariableDiagram = { instanceOf: "Apparatus" }
    diagram.count = 2;
    diagram.children = {
        state: diagramController(apparatus.state, references),
        suiteState: diagramController(apparatus.suiteState, references)
    }
    return diagram;
}

/**
 * Provide an Date instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable 
 * @param references 
 */
export function diagramDate(variable: Date, references: any[]): iVariableDiagram {
    if (references.includes(variable)) { return makeReference("Date", references.indexOf(variable)); }
    references.push(variable);
    const diagram = { instanceOf: "Date" } as iVariableDiagram
    diagram.value = variable.toUTCString();
    return diagram;
}

/**
 * Provide an Array instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable 
 * @param references 
 */
export function diagramArray(variable: any[], references: any[]): iVariableDiagram {
    if (references.includes(variable)) { return makeReference("Array", references.indexOf(variable)); }
    const diagram = { instanceOf: "Array" } as iVariableDiagram;
    diagram.children = {}
    diagram.count = variable.length;
    variable.forEach((item, index) => {
        diagram.children[index] = diagramController(item, references)
    })
    return diagram;
}

/**
 * Provide an object instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable 
 * @param references 
 */
export function diagramObject(variable: object, references: any[]): iVariableDiagram {
    const type = variable.constructor ? variable.constructor.name : typeof variable;
    if (references.includes(variable)) { return makeReference(type, references.indexOf(variable)); }
    const diagram = { instanceOf: type } as iVariableDiagram;
    diagram.children = {}
    for (let iterator in variable) {
        diagram.children[iterator] = diagramController(variable[iterator], references);
    }
    diagram.count = Object.keys(diagram.children).length;
    return diagram;
}

/**
 * Provide an function instance as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable 
 */
export function diagramFunction(variable: Function): iVariableDiagram {
    const functionName: string = variable.name === "" ? "function()" : `${variable.name}()`;
    const diagram: iVariableDiagram = { instanceOf: functionName }
    diagram.value = variable.toString().substr(0, 16) + "...";
    return diagram
}

/**
 * Provide an instance of a primitive and as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable 
 */
export function diagramPrimitive(variable: any): iVariableDiagram {
    return { instanceOf: typeof variable, value: JSON.stringify(variable) }
}
