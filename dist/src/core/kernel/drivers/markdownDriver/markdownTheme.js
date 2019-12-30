"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indent() {
    return "    ";
}
exports.indent = indent;
function h1(lines, text, pad = "") {
    const line = `# ${text}`;
    lines.push(pad + line);
    pressEnter(lines);
    return line;
}
exports.h1 = h1;
function h2(lines, text, pad = "") {
    const line = `## ${text}`;
    lines.push(pad + line);
    pressEnter(lines);
    return line;
}
exports.h2 = h2;
function h3(lines, text, pad = "") {
    const line = `### ${text}`;
    lines.push(line);
    pressEnter(lines);
    return line;
}
exports.h3 = h3;
function h4(lines, text, pad = "") {
    const line = `#### ${text}`;
    lines.push(line);
    pressEnter(lines);
    return line;
}
exports.h4 = h4;
function h5(lines, text, pad = "") {
    const line = `###### ${text}`;
    lines.push(line);
    pressEnter(lines);
    return line;
}
exports.h5 = h5;
function link(lines, label, href, pad = "") {
    const line = `[${label}](${href})`;
    lines.push(line);
    pressEnter(lines);
    return line;
}
exports.link = link;
function p(lines, text, pad = "") {
    lines.push(text);
    pressEnter(lines);
    return text;
}
exports.p = p;
function blockquote(lines, text, pad = "") {
    const line = `> ${text}`;
    lines.push(line);
    pressEnter(lines);
    return line;
}
exports.blockquote = blockquote;
function pressEnter(lines) {
    lines.push("");
}
exports.pressEnter = pressEnter;
function code(lines, lang, code) {
    lines.push("```" + lang);
    code.split("\n")
        .forEach(line => lines.push(line));
    lines.push("```");
    pressEnter(lines);
}
exports.code = code;
function oneSpace() {
    return " ";
}
exports.oneSpace = oneSpace;
function oneTab() {
    return "    ";
}
exports.oneTab = oneTab;
function item(lines, word, pad = "") {
    lines.push(`${pad}- ${word}`);
}
exports.item = item;
function indentChars(lines, count, text) {
    let indent = "";
    for (let i = 0; i < count; i++) {
        indent += "&nbsp;";
    }
    lines.push(indent + text);
    pressEnter(lines);
}
exports.indentChars = indentChars;
function highlight(text) {
    return "```" + text + "```";
}
exports.highlight = highlight;
//# sourceMappingURL=markdownTheme.js.map