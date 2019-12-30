import { Vue } from 'vue-property-decorator';
export default class ElevatePathName extends Vue {
    path: string;
    get pathName(): string;
}
