

export function indent() {
    return "    "
}

export function h1(lines: string[], text: string, pad: string = "") {
    const line = `# ${text}`
    lines.push(pad + line);
    pressEnter(lines)
    return line;
}

export function h2(lines: string[], text: string, pad: string = "") {
    const line = `## ${text}`
    lines.push(pad + line);
    pressEnter(lines)
    return line;
}

export function h3(lines: string[], text: string, pad: string = "") {
    const line = `### ${text}`
    lines.push(line);
    pressEnter(lines)
    return line;
}

export function h4(lines: string[], text: string, pad: string = "") {
    const line = `#### ${text}`
    lines.push(line);
    pressEnter(lines)
    return line;
}

export function h5(lines: string[], text: string, pad: string = "") {
    const line = `###### ${text}`
    lines.push(line);
    pressEnter(lines)
    return line;
}

export function link(lines: string[], label: string, href: string, pad: string = "") {
    const line = `[${label}](${href})`
    lines.push(line);
    pressEnter(lines);
    return line;
}

export function p(lines: string[], text: string, pad: string = "") {
    lines.push(text)
    pressEnter(lines);
    return text;
}

export function blockquote(lines: string[], text: string, pad: string = "") {
    const line = `> ${text}`
    lines.push(line)
    pressEnter(lines);
    return line;
}

export function pressEnter(lines: string[]) {
    lines.push("")
}

export function code(lines: string[], lang: string, code: string) {
    lines.push("```" + lang)
    code.split("\n")
        .forEach(line => lines.push(line))
    lines.push("```");
    pressEnter(lines);
}

export function oneSpace() {
    return " "
}

export function oneTab() {
    return "    "
}

export function item(lines: string[], word: string, pad: string = "") {
    lines.push(`${pad}- ${word}`);
}

export function indentChars(lines: string[], count: number, text: string) {
    let indent = "";
    for (let i = 0; i < count; i++) { indent += "&nbsp;" }
    lines.push(indent + text);
    pressEnter(lines);
}

export function highlight(text: string) {
    return "```" + text + "```";
}
