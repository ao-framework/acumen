<template>
  <div v-if="Array.isArray(instance.error)" class="snapshot-test-instance-error-manager">
    <div class="error-viewer">
      <pre class="line" v-bind:key="index" v-for="(line, index) of lines">{{line}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import client from 'client/client';

  @Component
  export default class SnapshotTestInstanceErrorManager extends Vue {

    public client = client

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public get lines() {
      const regex = new RegExp(client.currentWorkingDirectory.replace(/\\/g, "\\\\"), "g")
      return this.instance.error.map(line => {
        return line;
        return line.replace(regex, "\$\$")
      })
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-test-instance-error-manager {
    .error-viewer {
      margin-top: 16px;
      padding: 4px;
      overflow: hidden;
      pre.line {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
</style>
