export declare class Tagger {
    tags: string[];
    add(...tags: string[]): void;
    remove(tag: string): void;
    hasOnly(...tags: string[]): boolean;
    missing(...tags: string[]): boolean;
    has(...tags: string[]): boolean;
}
