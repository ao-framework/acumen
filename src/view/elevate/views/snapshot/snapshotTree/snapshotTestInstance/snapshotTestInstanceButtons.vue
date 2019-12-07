<template>
  <div class="snapshot-test-instance-buttons">
    <div @click="open()" class="button">Open</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from "client/client";
  import { iSnapshotTest } from "../../../../../../contracts/snapshots/model/iSnapshotTest"
  import { iSnapshotTestInstance } from "../../../../../../contracts/snapshots/model/iSnapshotTestInstance"

  @Component
  export default class SnapshotTestInstanceButtons extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public open() {
      client.snapshots.selectInstance(this.instance, this.test);
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance-buttons {
    width: 100%;
    text-align: right;
    .button {
      display: inline;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      margin-left: 16px;
      background: rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      padding: 4px 16px;
      border-radius: 654px;
      font-size: 12px;
      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
</style>
