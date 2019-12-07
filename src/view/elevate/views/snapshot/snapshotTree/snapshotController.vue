<template>
  <div class="snapshot-controller">
    <elevate-tree-node :collapsed="collapsed" :styles="treeStyles">
      <template v-slot:content>
        <div class="information">
          <div class="name">{{controller.command}}</div>
          <div class="description">{{controller.description}}</div>
        </div>
      </template>
      <template v-slot:children>
        <div class="instances">
          <snapshot-test-instance
            :collapsed="true"
            :instance="instance"
            :test="controller"
            v-bind:key="index"
            v-for="(instance, index) of controller.instances"
          />
        </div>
        <div
          v-if="controller.instances.length === 0"
          class="message"
        >This controller has not been called</div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import SnapshotTestInstance from './snapshotTestInstance/snapshotTestInstance.vue';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';

  @Component({
    components: {
      "snapshot-test-instance": SnapshotTestInstance
    }
  })
  export default class SnapshotController extends Vue {

    @Prop()
    public controller: iSnapshotTest;

    @Prop()
    public collapsed: boolean;

    public get treeStyles() {
      return {
        borderLeft: this.controller.containsFailures ? "3px solid red" : "3px solid deepskyblue",
        color: "rgba(255,255,255,0.6)",
        background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)"
      }
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-controller {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
