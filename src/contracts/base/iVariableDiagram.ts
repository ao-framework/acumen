export interface iVariableDiagram {
    instanceOf: string;
    count?: number;
    value?: string;
    children?: { [key: string]: iVariableDiagram }
}
