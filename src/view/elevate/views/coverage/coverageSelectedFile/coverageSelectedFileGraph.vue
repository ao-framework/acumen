<template>
  <div class="coverage-selected-file-graph">
    <elevate-row :breakPoint="1024">
      <elevate-column>
        <elevate-indicator label="Statements" :value="statementPercentage + '%'"></elevate-indicator>
      </elevate-column>
      <elevate-column>
        <elevate-indicator label="Functions" :value="functionPercentage + '%'"></elevate-indicator>
      </elevate-column>
      <elevate-column>
        <elevate-indicator label="Branches" :value="branchPercentage + '%'"></elevate-indicator>
      </elevate-column>
    </elevate-row>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';

  @Component
  export default class CoverageSelectedFileGraph extends Vue {

    @Prop()
    public file: iCoverageFile

    public get statementPercentage() {
      return this.file.statementPercentage.toFixed(1)
    }

    public get branchPercentage() {
      return this.file.branchPercentage.toFixed(1)
    }

    public get functionPercentage() {
      return this.file.functionPercentage.toFixed(1)
    }

  }
</script>

<style lang="scss" scoped>
  .coverage-selected-file-graph {
    .field {
      background: deepskyblue;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .label {
        color: white;
        padding: 8px;
      }
      .percentage {
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
      }
    }
  }
</style>
