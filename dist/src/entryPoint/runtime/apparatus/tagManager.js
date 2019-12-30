"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tagger {
    constructor() {
        this.tags = [];
    }
    add(...tags) {
        tags.forEach(tag => this.tags.push(tag));
    }
    remove(tag) {
        const index = this.tags.indexOf(tag);
        if (typeof index === "number") {
            this.tags.splice(index, 1);
        }
    }
    hasOnly(...tags) {
        if (this.has(...tags)) {
            if (this.tags.length === tags.length) {
                return true;
            }
        }
        return false;
    }
    missing(...tags) {
        return !this.has(...tags);
    }
    has(...tags) {
        let missingTag = false;
        tags.forEach(tag => {
            if (!this.tags.includes(tag)) {
                missingTag = true;
            }
        });
        return !missingTag;
    }
}
exports.Tagger = Tagger;
//# sourceMappingURL=tagManager.js.map