import { Apparatus } from "../../src";
import { debounce } from "../../src/commons/debounce";

export class SuiteDebounce {

    public descriptions = {
        suite: "handles all functions in the debounce file",
        doDebounceTest: "it should be able to do debouncing"
    }

    public async controller({ test }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.doDebounceTest))
    }

    public async doDebounceTest({ expect, spotlight, warning }: Apparatus) {
        let count = 0;
        const context = { name: "something" }
        const fn = debounce(context, function () {
            expect(this.name).equal("something")
            if (this !== context) { warning("context was not correct", context) }
            count++;
        }, 100)
        fn();
        fn();
        fn();
        expect(typeof fn).equal("function")
        return new Promise((done, error) => {
            setTimeout(() => {
                expect(count).equal(1);
                if (count !== 1) { warning("count was not one", count) }
                done();
            }, 200)
        })
    }
}
