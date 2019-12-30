import { Vue } from 'vue-property-decorator';
export default class ElevateViewer extends Vue {
    panelOpen: boolean;
    loading: boolean;
    section: string;
    path: string;
}
