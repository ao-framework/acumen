<template>
  <div class="snapshot-test">
    <elevate-tree-node :hasTotem="false" :collapsed="collapsed" :styles="treeStyles">
      <template v-slot:content>
        <div class="information">
          <div class="name">{{test.command}}</div>
          <div class="description">({{test.instances.length}}) {{test.description}}</div>
        </div>
      </template>
      <template v-slot:children>
        <div class="instances">
          <snapshot-test-instance
            :collapsed="true"
            :instance="instance"
            :test="test"
            v-bind:key="index"
            v-for="(instance, index) of test.instances"
          />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import SnapshotTestInstance from './snapshotTestInstance/snapshotTestInstance.vue';

  @Component({
    components: {
      "snapshot-test-instance": SnapshotTestInstance
    }
  })
  export default class SnapshotTest extends Vue {

    @Prop()
    public test: iSnapshotTest;

    @Prop()
    public collapsed: boolean;

    public get treeStyles() {
      return {
        color: "rgba(255,255,255,0.6)",
        background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)",
        borderLeft: this.test.containsFailures ? "3px solid red" : "3px solid deepskyblue",
      }
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-test {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
