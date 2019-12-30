import { iContentsHandler } from "../../../contracts/base/iContentsHandler";
import { EnvironmentApi } from "../base/api/environmentApi";
import { MarkdownEnvironment } from "../markdownEnvironment";
export declare class MarkdownEnvironmentApi extends EnvironmentApi<MarkdownEnvironment> {
    /**
     * Provide a path to a file, relative to your current working directory, as an argument.
     * When schema information is provided, documentation detailing the your test's schema will be
     * generated in that file. Optionally if you would like to alter the contents of the file
     * before they are written to disk, provide a callback to alter the contents. The callbacks first
     * argument will be an array of strings that represents the each line of the file. Whatever you alter
     * in the array will be written to disk.
     * @param directory
     * @param contentsHandler
     */
    documentSchema(path: string, contentsHandler?: iContentsHandler): void;
    /**
     * Provide a path to a file, relative to your current working directory, as an argument.
     * When snapshot information is provided, documentation detailing the your test's snapshot will be
     * generated in that file. Optionally if you would like to alter the contents of the file
     * before they are written to disk, provide a callback to alter the contents. The callbacks first
     * argument will be an array of strings that represents the each line of the file. Whatever you alter
     * in the array will be written to disk.
     * @param directory
     * @param contentsHandler
     */
    documentSnapshot(path: string, contentsHandler?: iContentsHandler): void;
    /**
      * Provide a path to a file, relative to your current working directory, as an argument.
      * When snapshot information is provided, documentation detailing the your test's snapshot will be
      * generated in that file. Optionally if you would like to alter the contents of the file
      * before they are written to disk, provide a callback to alter the contents. The callbacks first
      * argument will be an array of strings that represents the each line of the file. Whatever you alter
      * in the array will be written to disk.
      * @param directory
      * @param contentsHandler
      */
    documentCoverage(path: string, contentsHandler?: iContentsHandler): void;
}
