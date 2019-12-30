import { Vue } from 'vue-property-decorator';
export default class ElevateTreeNode extends Vue {
    styles: object;
    hasTotem: boolean;
    totemColor: string;
    collapsed: boolean;
    showingChildren: boolean;
    get loadChildren(): boolean;
    hasSlot(name?: string): boolean;
    toggle(): void;
}
