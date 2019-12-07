export class Tagger {

    public tags: string[] = [];

    public add(...tags: string[]) {
        tags.forEach(tag => this.tags.push(tag));
    }

    public remove(tag: string) {
        const index = this.tags.indexOf(tag)
        if (typeof index === "number") {
            this.tags.splice(index, 1);
        }
    }



    public hasOnly(...tags: string[]) {
        if (this.has(...tags)) {
            if (this.tags.length === tags.length) {
                return true;
            }
        }
        return false;
    }

    public missing(...tags: string[]) {
        return !this.has(...tags)
    }

    public has(...tags: string[]) {
        let missingTag: boolean = false;
        tags.forEach(tag => {
            if (!this.tags.includes(tag)) {
                missingTag = true;
            }
        })
        return !missingTag;
    }
}
