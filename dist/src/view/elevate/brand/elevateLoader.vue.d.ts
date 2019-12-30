import { Vue } from 'vue-property-decorator';
export default class ElevateLoader extends Vue {
    loading: boolean;
    hasSlot(name?: string): boolean;
}
