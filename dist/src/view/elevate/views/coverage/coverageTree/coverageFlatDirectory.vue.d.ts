import { Vue } from 'vue-property-decorator';
import { iCoverageDirectory } from 'contracts/coverage/model/iCoverageDirectory';
export default class CoverageFlatDirectory extends Vue {
    directory: iCoverageDirectory;
    query: string;
    get files(): any[];
}
