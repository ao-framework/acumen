<template>
  <div class="coverage">
    <elevate-loader :loading="client.loading">Loading Coverage</elevate-loader>
    <elevate-viewer
      section="Coverage"
      v-if="client.loading === false && client.coverage.currentEntry"
      :path="client.coverage.currentEntry.shortPath"
      :panelOpen="!client.coverage.currentFile"
      :loading="client.coverage.currentEntry.coverageLoading"
    >
      <template v-slot:panel>
        <div class="panel-wrapper">
          <coverage-tree :entry="client.coverage.currentEntry" />
        </div>
      </template>
      <template v-slot:content>
        <coverage-selected-file
          v-if="client.coverage.currentFile"
          :file="client.coverage.currentFile"
        />
      </template>
    </elevate-viewer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { EntryFile } from "client/entry/entryFile";
  import client from 'client/client';
  import CoverageTree from './coverageTree/coverageTree.vue';
  import CoverageSelectedFile from './coverageSelectedFile/coverageSelectedFile.vue';

  @Component({
    components: {
      "coverage-tree": CoverageTree,
      "coverage-selected-file": CoverageSelectedFile
    }
  })
  export default class Coverage extends Vue {

    public client = client

    public mounted() {
      if (this.client.loading) {
        this.client.on("load", () => {
          this.client.coverage.selectEntry(this.$route.params.entryPoint);
          this.client.coverage.getCoverageForEntry(this.client.coverage.currentEntry);
        })
      } else {
        this.client.coverage.selectEntry(this.$route.params.entryPoint);
        this.client.coverage.getCoverageForEntry(this.client.coverage.currentEntry);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .coverage {
    .panel-wrapper {
      margin: 0 auto;
      width: 80%;
      max-width: 1200px;
    }
  }
</style>
