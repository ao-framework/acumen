<template>
  <div class="snapshot-suite">
    <elevate-tree-node
      :collapsed="collapsed && !suite.containsFailures"
      :styles="treeStyles"
      :showHighlight="true"
      :hasTotem="true"
      :totemColor="totemColor"
    >
      <template v-slot:content>
        <div class="information">
          <div class="name">{{suite.name}}</div>
          <div class="description">{{suite.description}}</div>
        </div>
      </template>
      <template v-slot:children>
        <div class="controller">
          <snapshot-controller :collapsed="true" :controller="suite.controller" />
        </div>
        <div class="suites">
          <div class="tests">
            <snapshot-test
              :collapsed="true"
              :test="test"
              v-bind:key="key"
              v-for="(test, key) in suite.tests"
            />
          </div>
          <snapshot-suite
            :collapsed="true"
            :suite="suite"
            v-bind:key="key"
            v-for="(suite, key) in suite.suites"
          />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import SnapshotTest from './snapshotTest.vue';
  import SnapshotController from './snapshotController.vue';
  import { iSnapshotSuite } from 'contracts/snapshots/model/iSnapshotSuite';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';

  @Component({
    components: {
      "snapshot-test": SnapshotTest,
      "snapshot-controller": SnapshotController
    }
  })
  export default class SnapshotSuite extends Vue {

    @Prop()
    public suite: iSnapshotSuite;

    @Prop()
    public collapsed: boolean;

    public get totemColor() {
      return this.suite.containsFailures ? "red" : "deepskyblue";
    }

    public treeStyles = {
      color: "rgba(255,255,255,0.6)",
      background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)"
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-suite {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
