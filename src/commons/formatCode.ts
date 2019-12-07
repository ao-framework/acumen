import * as prettier from "prettier";

/**
 * When code needs to be displayed in a view, this function
 * formats that code to take care of any weird spaces
 * @param code 
 */
export function formatCode(code: string) {
    return prettier.format(code, {
        semi: true,
        parser: "babel",
    })
}
