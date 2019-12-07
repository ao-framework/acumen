<template>
  <div class="snapshot-test-instance-meta-information">
    <div class="field id">
      <div class="label">Time (ms)</div>
      <div class="value">{{instance.time.toFixed(5)}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';

  @Component
  export default class SnapshotTestInstanceMetaInformation extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance-meta-information {
    .field {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 4px;
      .label {
        font-size: 12px;
        width: 70px;
        text-align: right;
        color: rgba(255, 255, 255, 0.3);
        margin-right: 4px;
        &::after {
          content: ":";
        }
      }
      .value {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 654px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 4px 16px;
      }
    }
  }
</style>
