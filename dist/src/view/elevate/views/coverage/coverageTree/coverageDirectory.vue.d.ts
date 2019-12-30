import { Vue } from 'vue-property-decorator';
import { iCoverageDirectory } from 'contracts/coverage/model/iCoverageDirectory';
export default class CoverageDirectory extends Vue {
    directory: iCoverageDirectory;
    collapsed: boolean;
    treeStyles: {
        color: string;
        background: string;
    };
}
