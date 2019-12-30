"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const filesystemValidators_1 = require("../../src/commons/filesystemValidators");
class SuiteFilesystemValidators {
    constructor() {
        this.descriptions = {
            suite: "Handles all of the function is filesystemValidators",
            relativeToAcumenTest: "it should be able to return a path in context of the acumen directory",
            relativeToProjectTest: "it should be able to return a path in context of the project directory",
            isFileTest: "it should be able to return true is file exists",
            isFileOrFailTest: "it should be able to return true if file exists and throw message when it doesn't",
            isDirectoryTest: "it should be able to return true if directory exists",
            isDirectoryOrFailTest: "it should be able to return true if directory exists and throw message when it doesn't",
            fileContentsTest: "it should be able to read the contents of a file",
            fileContentsFailTest: "it should be able to fail at reading the contents of a file",
            makeRelativePathsTest: "it should be able to set files in context"
        };
    }
    async controller({ test, testAll }) {
        return Promise.resolve()
            .then(() => test(this.relativeToAcumenTest))
            .then(() => test(this.relativeToProjectTest))
            .then(() => test(this.isFileTest))
            .then(() => test(this.isFileOrFailTest))
            .then(() => test(this.isDirectoryTest))
            .then(() => test(this.isDirectoryOrFailTest))
            .then(() => test(this.fileContentsTest))
            .then(() => test(this.fileContentsFailTest))
            .then(() => test(this.makeRelativePathsTest));
    }
    relativeToAcumenTest({ expect, generator }) {
        expect(filesystemValidators_1.relativeToAcumen("something")).to.include(process.cwd());
    }
    relativeToProjectTest({ expect }) {
        expect(filesystemValidators_1.relativeToProject("something")).to.include(process.cwd());
    }
    isFileTest({ expect, beforeThrowing, spotlight }) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath);
        });
        const goodPath = filesystemValidators_1.relativeToAcumen("package.json");
        const badPath = filesystemValidators_1.relativeToAcumen("something.json");
        const doesHaveFile = filesystemValidators_1.isFile(goodPath);
        const doesntHaveFile = filesystemValidators_1.isFile(badPath);
        expect(doesHaveFile).equal(true);
        expect(doesntHaveFile).equal(false);
    }
    isFileOrFailTest({ expect, beforeThrowing, spotlight }) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath);
        });
        const goodPath = filesystemValidators_1.relativeToAcumen("package.json");
        const badPath = filesystemValidators_1.relativeToAcumen("something.json");
        expect(() => {
            const returned = filesystemValidators_1.isFileOrFail(goodPath, "na");
            expect(returned).equal(true);
        }).to.not.throw();
        expect(() => filesystemValidators_1.isFileOrFail(badPath, "bad message")).to.throw("bad message");
    }
    isDirectoryTest({ expect, beforeThrowing, spotlight }) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath);
        });
        const goodPath = filesystemValidators_1.relativeToAcumen("src");
        const badPath = filesystemValidators_1.relativeToAcumen("lksjdflkjsdlkfjsdofijweflkjsdf");
        const goodDirectory = filesystemValidators_1.isDirectory(goodPath);
        const badDirectory = filesystemValidators_1.isDirectory(badPath);
        expect(goodDirectory).equal(true);
        expect(badDirectory).equal(false);
    }
    isDirectoryOrFailTest({ expect, beforeThrowing, spotlight }) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath);
        });
        const goodPath = filesystemValidators_1.relativeToAcumen("src");
        const badPath = filesystemValidators_1.relativeToAcumen("lksjdflkjsdlkfjsdofijweflkjsdf");
        expect(() => {
            const returned = filesystemValidators_1.isDirectoryOrFail(goodPath, "na");
            expect(returned).equal(true);
        }).to.not.throw();
        expect(() => filesystemValidators_1.isDirectoryOrFail(badPath, "bad message")).to.throw("bad message");
    }
    async fileContentsTest({ expect, spotlight, beforeThrowing }) {
        beforeThrowing(() => spotlight("path", path));
        const path = filesystemValidators_1.relativeToProject("package.json");
        return filesystemValidators_1.fileContents(path, "bad message")
            .then(contents => {
            expect(typeof contents).equal("string");
        });
    }
    async fileContentsFailTest({ expect, spotlight, beforeThrowing, warning }) {
        beforeThrowing(() => spotlight("path", path));
        const path = filesystemValidators_1.relativeToProject("packager.json");
        return filesystemValidators_1.fileContents(path, "bad message")
            .then(contents => {
            warning("it read these contents", contents);
            throw new Error("should never reach");
        })
            .catch(err => {
            expect(err.message).equal("bad message");
        });
    }
    makeRelativePathsTest({ expect, spotlight, beforeThrowing }) {
        beforeThrowing(() => spotlight("final", final));
        const paths = ["one", "two", "three"];
        const final = filesystemValidators_1.makeRelativePaths(paths, "something");
        expect(final[0]).equal(`something${path_1.sep}one`);
        expect(final[1]).equal(`something${path_1.sep}two`);
        expect(final[2]).equal(`something${path_1.sep}three`);
    }
}
exports.SuiteFilesystemValidators = SuiteFilesystemValidators;
//# sourceMappingURL=suite.filesystemValidators.js.map