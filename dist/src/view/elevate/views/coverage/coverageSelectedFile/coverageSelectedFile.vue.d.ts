import { Vue } from 'vue-property-decorator';
import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
export default class CoverageSelectedFile extends Vue {
    file: iCoverageFile;
}
