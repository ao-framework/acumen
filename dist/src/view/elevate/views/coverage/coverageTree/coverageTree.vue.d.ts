import { Vue } from 'vue-property-decorator';
import { EntryFile } from 'client/entry/entryFile';
export default class CoverageTree extends Vue {
    mode: "tree" | "feed";
    entry: EntryFile;
}
