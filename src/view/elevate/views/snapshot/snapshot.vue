<template>
  <div class="snapshot">
    <elevate-loader :loading="client.loading">Loading Snapshot</elevate-loader>
    <elevate-viewer
      section="Snapshot"
      v-if="client.loading === false && client.snapshots.currentEntry"
      :path="client.snapshots.currentEntry.shortPath"
      :panelOpen="!client.snapshots.currentInstance"
      :loading="client.snapshots.currentEntry.snapshotLoading"
    >
      <template v-slot:panel>
        <div class="panel-wrapper">
          <snapshot-tree :entry="client.snapshots.currentEntry" />
        </div>
      </template>
      <template v-slot:content>
        <snapshot-selected-instance
          v-if="client.snapshots.currentInstance"
          :instance="client.snapshots.currentInstance"
          :test="client.snapshots.currentTest"
        />
      </template>
    </elevate-viewer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SnapshotSelectedInstance from "./snapshotSelectedInstance/snapshotSelectedInstance.vue"
  import SnapshotTree from "./snapshotTree/snapshotTree.vue"
  import client from 'client/client';

  @Component({
    components: {
      "snapshot-selected-instance": SnapshotSelectedInstance,
      "snapshot-tree": SnapshotTree
    }
  })
  export default class Snapshot extends Vue {

    public client = client;

    public mounted() {
      if (this.client.loading) {
        this.client.on("load", () => {
          this.client.snapshots.selectEntry(this.$route.params.entryPoint);
          this.client.snapshots.getSnapshotForEntry(this.client.snapshots.currentEntry);
        })
      } else {
        this.client.snapshots.selectEntry(this.$route.params.entryPoint);
        this.client.snapshots.getSnapshotForEntry(this.client.snapshots.currentEntry);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot {
    .panel-wrapper {
      margin: 0 auto;
      width: 80%;
      max-width: 1200px;
    }
  }
</style>
