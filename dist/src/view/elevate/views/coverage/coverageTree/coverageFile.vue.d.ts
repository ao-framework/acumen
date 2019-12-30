import { Vue } from 'vue-property-decorator';
import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
export default class CoverageFile extends Vue {
    file: iCoverageFile;
    get treeStyles(): {
        color: string;
        background: string;
        borderLeft: string;
    };
    open(): void;
}
