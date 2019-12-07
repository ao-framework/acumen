<template>
  <div @click="open()" class="coverage-file">
    <elevate-tree-node :styles="treeStyles">
      <template v-slot:content>
        <div class="information">
          <div class="name">{{file.fileName}}</div>
          <coverage-selected-file-graph :file="file" />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from 'client/client';
  import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
  import CoverageSelectedFileGraph from '../coverageSelectedFile/coverageSelectedFileGraph.vue';

  @Component({
    components: {
      "coverage-selected-file-graph": CoverageSelectedFileGraph
    }
  })
  export default class CoverageFile extends Vue {

    @Prop()
    public file: iCoverageFile;

    public get treeStyles() {
      return {
        color: "rgba(255,255,255,0.6)",
        background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)",
        borderLeft: this.file.coverage ? "3px solid deepskyblue" : "3px solid gray",
      }
    }

    public open() {
      client.coverage.selectFile(this.file);
    }

  }
</script>

<style lang="scss" scoped>
  .coverage-file {
    .information {
      padding: 16px;
    }
  }
</style>
