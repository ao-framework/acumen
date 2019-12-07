<template>
  <div class="snapshot-test-instance-reference">
    <div class="test"></div>
    <div class="caller"></div>
    <span class="label">{{test.command}}@</span>
    <span class="suiteName">{{instance.callerSuiteName || ""}}</span>
    <span v-if="instance.callerSuiteName" class="dot">.</span>
    <span class="command">{{instance.callerTestCommand || "Acumen"}}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';

  @Component
  export default class SnapshotTestInstanceReference extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public get nameTokens() {
      const tokens: string[] = [];
      if (this.instance.callerSuiteName) {
        tokens.push(this.instance.callerSuiteName)
      }
      if (this.instance.callerTestCommand) {
        tokens.push(this.instance.callerTestCommand)
      }
      return tokens;
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance-reference {
    width: 100%;
    .label {
      margin-right: -9px;
      color: rgba(255, 255, 255, 0.1);
    }
    .suiteName {
      color: deepskyblue;
    }
    .dot {
      color: rgba(255, 255, 255, 0.6);
    }
    .command {
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
