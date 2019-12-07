<template>
  <div @click="open()" class="snapshot-test-instance">
    <elevate-tree-node
      totemColor="white"
      :collapsed="collapsed"
      :styles="treeStyles"
      :hasTotem="false"
    >
      <template v-slot:content>
        <div class="snapshot-test-instance-content">
          <div class="header">
            <snapshot-test-instance-bar :instance="instance" :test="test" />
          </div>
          <div class="information">
            <elevate-row :breakPoint="1024">
              <elevate-column>
                <snapshot-test-instance-reference :instance="instance" :test="test" />
              </elevate-column>
              <elevate-column>
                <snapshot-test-instance-meta-information :instance="instance" :test="test" />
              </elevate-column>
            </elevate-row>
          </div>
          <snapshot-test-instance-error-manager :instance="instance" :test="test" />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import SnapshotTestInstanceReference from './snapshotTestInstanceReference.vue';
  import SnapshotTestInstanceMetaInformation from './snapshotTestInstanceMetaInformation.vue';
  import SnapshotTestInstanceBar from './snapshotTestInstanceBar.vue';
  import SnapshotTestInstanceErrorManager from './snapshotTestInstanceErrorManager.vue';
  import SnapshotTestInstanceButtons from "./snapshotTestInstanceButtons.vue";
  import client from 'client/client';

  @Component({
    components: {
      "snapshot-test-instance-reference": SnapshotTestInstanceReference,
      "snapshot-test-instance-meta-information": SnapshotTestInstanceMetaInformation,
      "snapshot-test-instance-bar": SnapshotTestInstanceBar,
      "snapshot-test-instance-error-manager": SnapshotTestInstanceErrorManager,
      "snapshot-test-instance-buttons": SnapshotTestInstanceButtons
    }
  })
  export default class SnapshotTestInstance extends Vue {

    @Prop()
    public collapsed: boolean;

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public get treeStyles() {
      return {
        color: "white",
        backgroundImage: this.getBackground(),
        marginBottom: "32px",
      }
    }

    public getBackground() {
      if (this.instance.type === "failure") {
        return "radial-gradient(circle,rgba(255, 0, 0, 0.2) 0%,rgba(7, 12, 19, 1) 100%)"
      }
      return "radial-gradient(circle,rgba(7, 69, 99, 0.2) 0%,rgba(7, 12, 19, 1) 100%)"
    }

    public open() {
      client.snapshots.selectInstance(this.instance, this.test);
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance {
    .information {
      display: flex;
    }
  }
</style>
