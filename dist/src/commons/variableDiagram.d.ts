import { iVariableDiagram } from "../contracts/base/iVariableDiagram";
import { Apparatus } from "../entryPoint/runtime/apparatus/apparatus";
/**
 * Provide a variable of any type as an argument. It will create a full diagram
 * of your variable in the structure of iVariableDiagram
 * @param variable
 */
export declare function diagram(variable: any): iVariableDiagram;
/**
 * Provide a variable of any type and list of pointer references as an argument. It will create
 * a full diagram of your variable in the structure of iVariableDiagram. This is used as the
 * controller for the function diagram in case any major scoping changes are needed in the future.
 * @param variable
 * @param references
 */
export declare function diagramController(variable: any, references?: any[]): iVariableDiagram;
export declare function diagramBigInt(variable: bigint, references?: any[]): iVariableDiagram;
export declare function diagramSymbol(variable: symbol, references?: any[]): iVariableDiagram;
/**
 * Provide a type string and an index number as arguments. It will create a reference iVariableDiagram.
 * The reference is basically reference to an pointer that has already been ran through and doesn't need to
 * again. This reference is used to cut down on memory consumption and also protect against max call stack exceptions.
 * @param type
 * @param index
 */
export declare function makeReference(type: string, index: number): iVariableDiagram;
/**
 * Provide an Apparatus instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param apparatus
 * @param references
 */
export declare function diagramApparatus(apparatus: Apparatus, references: any[]): iVariableDiagram;
/**
 * Provide an Date instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
export declare function diagramDate(variable: Date, references: any[]): iVariableDiagram;
/**
 * Provide an Array instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
export declare function diagramArray(variable: any[], references: any[]): iVariableDiagram;
/**
 * Provide an object instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
export declare function diagramObject(variable: object, references: any[]): iVariableDiagram;
/**
 * Provide an function instance as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 */
export declare function diagramFunction(variable: Function): iVariableDiagram;
/**
 * Provide an instance of a primitive and as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 */
export declare function diagramPrimitive(variable: any): iVariableDiagram;
