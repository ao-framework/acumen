import { relativeToProject } from "../../commons/filesystemValidators";

export function filterLines(lines: string[]) {
    const projectPath = relativeToProject().replace(/\\/g, "\\\\");
    const projectRegex = new RegExp(projectPath, "g");
    return lines.map(line => line.replace(projectRegex, "."))
}
