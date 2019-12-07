<template>
  <div class="coverage-selected-file">
    <div class="wrapper">
      <coverage-selected-file-bar :file="file" />
      <coverage-selected-file-graph :file="file" />
      <elevate-code-editor
        v-if="file.sourcePath"
        :type="file.sourceExtension"
        :code="file.sourceCode"
        :selections="file.selections"
      />
      <elevate-code-editor
        v-if="!file.sourcePath"
        :type="file.transpiledExtension"
        :code="file.transpiledCode"
        :selections="file.selections"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
  import CoverageSelectedFileBar from './coverageSelectedFileBar.vue';
  import CoverageSelectedFileGraph from './coverageSelectedFileGraph.vue';

  @Component({
    components: {
      "coverage-selected-file-bar": CoverageSelectedFileBar,
      "coverage-selected-file-graph": CoverageSelectedFileGraph
    }
  })
  export default class CoverageSelectedFile extends Vue {

    @Prop()
    public file: iCoverageFile;

  }
</script>

<style lang="scss" scoped>
  .coverage-selected-file {
    .wrapper {
      margin: 0 auto;
      width: 80%;
      max-width: 1200px;
    }
  }
</style>
