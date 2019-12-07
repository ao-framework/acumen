import { Apparatus } from "../../src";
import { formatCode } from "../../src/commons/formatCode";

export class SuiteFormatCode {

    public descriptions = {
        suite: "handles all functions in the formatCode file",
        formatCodeTest: "it should be able to call prettier without breaking"
    }

    public async controller({ suite, test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.formatCodeTest))
    }

    /**
      * No need to test extensively. The prettier library should be
      * taking care of this for us.
      */
    public formatCodeTest({ expect, warning }: Apparatus) {
        const formatted = `function name() {}\n`;
        const string = formatCode("function name() {}")
        expect(string).equal(formatted)
        if (string !== formatted) {
            warning("Code was not formatted correctly", string);
        }
    }
}
