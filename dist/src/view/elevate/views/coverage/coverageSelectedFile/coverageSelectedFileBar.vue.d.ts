import { Vue } from 'vue-property-decorator';
import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
export default class CoverageSelectedFileBar extends Vue {
    file: iCoverageFile;
    get path(): string;
    get name(): string;
    close(): void;
}
