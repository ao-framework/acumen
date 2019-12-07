import { sep } from "path";

import { Apparatus, suite } from "../../src";
import { fileContents, isDirectory, isDirectoryOrFail, isFile, isFileOrFail, makeRelativePaths, relativeToAcumen, relativeToProject } from "../../src/commons/filesystemValidators";

export class SuiteFilesystemValidators {

    public descriptions = {
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
    }

    public async controller({ test, testAll }: Apparatus) {
        return Promise.resolve()
            .then(() => test(this.relativeToAcumenTest))
            .then(() => test(this.relativeToProjectTest))
            .then(() => test(this.isFileTest))
            .then(() => test(this.isFileOrFailTest))
            .then(() => test(this.isDirectoryTest))
            .then(() => test(this.isDirectoryOrFailTest))
            .then(() => test(this.fileContentsTest))
            .then(() => test(this.fileContentsFailTest))
            .then(() => test(this.makeRelativePathsTest))
    }

    public relativeToAcumenTest({ expect, generator }: Apparatus) {
        expect(relativeToAcumen("something")).to.include(process.cwd())
    }

    public relativeToProjectTest({ expect }: Apparatus) {
        expect(relativeToProject("something")).to.include(process.cwd())
    }

    public isFileTest({ expect, beforeThrowing, spotlight }: Apparatus) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath)
        })
        const goodPath = relativeToAcumen("package.json")
        const badPath = relativeToAcumen("something.json")
        const doesHaveFile = isFile(goodPath)
        const doesntHaveFile = isFile(badPath)
        expect(doesHaveFile).equal(true);
        expect(doesntHaveFile).equal(false);
    }

    public isFileOrFailTest({ expect, beforeThrowing, spotlight }: Apparatus) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath)
        })
        const goodPath = relativeToAcumen("package.json")
        const badPath = relativeToAcumen("something.json")
        expect(() => {
            const returned = isFileOrFail(goodPath, "na")
            expect(returned).equal(true);
        }).to.not.throw()
        expect(() => isFileOrFail(badPath, "bad message")).to.throw("bad message");
    }

    public isDirectoryTest({ expect, beforeThrowing, spotlight }: Apparatus) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath)
        })
        const goodPath = relativeToAcumen("src")
        const badPath = relativeToAcumen("lksjdflkjsdlkfjsdofijweflkjsdf")
        const goodDirectory = isDirectory(goodPath)
        const badDirectory = isDirectory(badPath)
        expect(goodDirectory).equal(true);
        expect(badDirectory).equal(false);
    }

    public isDirectoryOrFailTest({ expect, beforeThrowing, spotlight }: Apparatus) {
        beforeThrowing(() => {
            spotlight("good path", goodPath);
            spotlight("bad path", badPath)
        })
        const goodPath = relativeToAcumen("src")
        const badPath = relativeToAcumen("lksjdflkjsdlkfjsdofijweflkjsdf")
        expect(() => {
            const returned = isDirectoryOrFail(goodPath, "na")
            expect(returned).equal(true);
        }).to.not.throw()
        expect(() => isDirectoryOrFail(badPath, "bad message")).to.throw("bad message");
    }

    public async fileContentsTest({ expect, spotlight, beforeThrowing }: Apparatus) {
        beforeThrowing(() => spotlight("path", path))
        const path = relativeToProject("package.json")
        return fileContents(path, "bad message")
            .then(contents => {
                expect(typeof contents).equal("string")
            })
    }

    public async fileContentsFailTest({ expect, spotlight, beforeThrowing, warning }: Apparatus) {
        beforeThrowing(() => spotlight("path", path))
        const path = relativeToProject("packager.json")
        return fileContents(path, "bad message")
            .then(contents => {
                warning("it read these contents", contents);
                throw new Error("should never reach")
            })
            .catch(err => {
                expect(err.message).equal("bad message");
            })
    }

    public makeRelativePathsTest({ expect, spotlight, beforeThrowing }: Apparatus) {
        beforeThrowing(() => spotlight("final", final))
        const paths = ["one", "two", "three"]
        const final = makeRelativePaths(paths, "something")
        expect(final[0]).equal(`something${sep}one`)
        expect(final[1]).equal(`something${sep}two`)
        expect(final[2]).equal(`something${sep}three`)
    }
}
