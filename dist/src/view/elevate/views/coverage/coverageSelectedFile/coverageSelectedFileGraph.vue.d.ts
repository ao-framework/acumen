import { Vue } from 'vue-property-decorator';
import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
export default class CoverageSelectedFileGraph extends Vue {
    file: iCoverageFile;
    get statementPercentage(): string;
    get branchPercentage(): string;
    get functionPercentage(): string;
}
