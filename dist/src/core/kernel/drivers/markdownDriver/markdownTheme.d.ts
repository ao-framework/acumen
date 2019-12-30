export declare function indent(): string;
export declare function h1(lines: string[], text: string, pad?: string): string;
export declare function h2(lines: string[], text: string, pad?: string): string;
export declare function h3(lines: string[], text: string, pad?: string): string;
export declare function h4(lines: string[], text: string, pad?: string): string;
export declare function h5(lines: string[], text: string, pad?: string): string;
export declare function link(lines: string[], label: string, href: string, pad?: string): string;
export declare function p(lines: string[], text: string, pad?: string): string;
export declare function blockquote(lines: string[], text: string, pad?: string): string;
export declare function pressEnter(lines: string[]): void;
export declare function code(lines: string[], lang: string, code: string): void;
export declare function oneSpace(): string;
export declare function oneTab(): string;
export declare function item(lines: string[], word: string, pad?: string): void;
export declare function indentChars(lines: string[], count: number, text: string): void;
export declare function highlight(text: string): string;