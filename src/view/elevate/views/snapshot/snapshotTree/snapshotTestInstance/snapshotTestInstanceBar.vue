<template>
  <div class="snapshot-test-instance-bar">
    <elevate-row :breakPoint="1024">
      <elevate-column>
        <elevate-indicator label="Arguments" :value="instance.args.length" />
      </elevate-column>
      <elevate-column>
        <elevate-indicator label="Spotlights" :value="instance.spotlights.length" />
      </elevate-column>
      <elevate-column>
        <elevate-indicator label="Warnings" :value="instance.warnings.length" />
      </elevate-column>
    </elevate-row>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';

  @Component
  export default class SnapshotTestInstanceBar extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance;

    @Prop()
    public test: iSnapshotTest;

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance-bar {
    margin-top: -8px;
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 16px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>
