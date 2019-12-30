"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apparatus_1 = require("../entryPoint/runtime/apparatus/apparatus");
const validators_1 = require("./validators");
/**
 * Provide a variable of any type as an argument. It will create a full diagram
 * of your variable in the structure of iVariableDiagram
 * @param variable
 */
function diagram(variable) {
    return diagramController(variable);
}
exports.diagram = diagram;
/**
 * Provide a variable of any type and list of pointer references as an argument. It will create
 * a full diagram of your variable in the structure of iVariableDiagram. This is used as the
 * controller for the function diagram in case any major scoping changes are needed in the future.
 * @param variable
 * @param references
 */
function diagramController(variable, references = []) {
    if (typeof variable === "bigint") {
        return diagramBigInt(variable, references);
    }
    if (typeof variable === "symbol") {
        return diagramSymbol(variable, references);
    }
    if (variable instanceof apparatus_1.Apparatus) {
        return diagramApparatus(variable, references);
    }
    if (variable instanceof Date) {
        return diagramDate(variable, references);
    }
    if (validators_1.isArray(variable)) {
        return diagramArray(variable, references);
    }
    if (validators_1.isObject(variable)) {
        return diagramObject(variable, references);
    }
    if (validators_1.isFunction(variable)) {
        return diagramFunction(variable);
    }
    return diagramPrimitive(variable);
}
exports.diagramController = diagramController;
function diagramBigInt(variable, references = []) {
    if (references.includes(variable)) {
        return makeReference("BigInt", references.indexOf(variable));
    }
    const diagram = { instanceOf: "BigInt" };
    diagram.value = variable.toString();
    return diagram;
}
exports.diagramBigInt = diagramBigInt;
function diagramSymbol(variable, references = []) {
    if (references.includes(variable)) {
        return makeReference("Symbol", references.indexOf(variable));
    }
    const diagram = { instanceOf: "Symbol" };
    diagram.value = variable.toString();
    return diagram;
}
exports.diagramSymbol = diagramSymbol;
/**
 * Provide a type string and an index number as arguments. It will create a reference iVariableDiagram.
 * The reference is basically reference to an pointer that has already been ran through and doesn't need to
 * again. This reference is used to cut down on memory consumption and also protect against max call stack exceptions.
 * @param type
 * @param index
 */
function makeReference(type, index) {
    return { instanceOf: type, value: `[reference: ${index}]` };
}
exports.makeReference = makeReference;
/**
 * Provide an Apparatus instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param apparatus
 * @param references
 */
function diagramApparatus(apparatus, references) {
    if (references.includes(apparatus)) {
        return makeReference("Apparatus", references.indexOf(apparatus));
    }
    const diagram = { instanceOf: "Apparatus" };
    diagram.count = 2;
    diagram.children = {
        state: diagramController(apparatus.state, references),
        suiteState: diagramController(apparatus.suiteState, references)
    };
    return diagram;
}
exports.diagramApparatus = diagramApparatus;
/**
 * Provide an Date instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
function diagramDate(variable, references) {
    if (references.includes(variable)) {
        return makeReference("Date", references.indexOf(variable));
    }
    references.push(variable);
    const diagram = { instanceOf: "Date" };
    diagram.value = variable.toUTCString();
    return diagram;
}
exports.diagramDate = diagramDate;
/**
 * Provide an Array instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
function diagramArray(variable, references) {
    if (references.includes(variable)) {
        return makeReference("Array", references.indexOf(variable));
    }
    const diagram = { instanceOf: "Array" };
    diagram.children = {};
    diagram.count = variable.length;
    variable.forEach((item, index) => {
        diagram.children[index] = diagramController(item, references);
    });
    return diagram;
}
exports.diagramArray = diagramArray;
/**
 * Provide an object instance and an list references [for saftey] as arguments. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 * @param references
 */
function diagramObject(variable, references) {
    const type = variable.constructor ? variable.constructor.name : typeof variable;
    if (references.includes(variable)) {
        return makeReference(type, references.indexOf(variable));
    }
    const diagram = { instanceOf: type };
    diagram.children = {};
    for (let iterator in variable) {
        diagram.children[iterator] = diagramController(variable[iterator], references);
    }
    diagram.count = Object.keys(diagram.children).length;
    return diagram;
}
exports.diagramObject = diagramObject;
/**
 * Provide an function instance as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 */
function diagramFunction(variable) {
    const functionName = variable.name === "" ? "function()" : `${variable.name}()`;
    const diagram = { instanceOf: functionName };
    diagram.value = variable.toString().substr(0, 16) + "...";
    return diagram;
}
exports.diagramFunction = diagramFunction;
/**
 * Provide an instance of a primitive and as an argument. It will create
 * a iVariableDiagram representing it and return it.
 * @param variable
 */
function diagramPrimitive(variable) {
    return { instanceOf: typeof variable, value: JSON.stringify(variable) };
}
exports.diagramPrimitive = diagramPrimitive;
//# sourceMappingURL=variableDiagram.js.map