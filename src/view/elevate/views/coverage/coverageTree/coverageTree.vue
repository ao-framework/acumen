<template>
  <div class="coverage-tree">
    <div class="buttons">
      <elevate-row class="left" :breakPoint="1024">
        <elevate-column class="pad">
          <div :class="{ 'selected': mode === 'feed' }" @click="mode = 'feed'" class="button">
            <font-awesome-icon icon="grip-lines" />
          </div>
        </elevate-column>
        <elevate-column class="pad">
          <div :class="{ 'selected': mode === 'tree' }" @click="mode = 'tree'" class="button">
            <font-awesome-icon icon="stream" />
          </div>
        </elevate-column>
      </elevate-row>
    </div>
    <coverage-directory
      :collapsed="false"
      v-if="entry.coverage && mode==='tree'"
      :directory="entry.coverage.directory"
    />
    <coverage-flat-directory
      v-if="entry.coverage && entry.coverage.directory && mode==='feed'"
      :directory="entry.coverage.directory"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import CoverageDirectory from './coverageDirectory.vue';
  import { EntryFile } from 'client/entry/entryFile';
  import CoverageFlatDirectory from './coverageFlatDirectory.vue';

  @Component({
    components: {
      "coverage-directory": CoverageDirectory,
      "coverage-flat-directory": CoverageFlatDirectory
    }
  })
  export default class CoverageTree extends Vue {

    public mode: "tree" | "feed" = "feed";

    @Prop()
    public entry: EntryFile;

  }
</script>

<style lang="scss" scoped>
  .coverage-tree {
    .buttons {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      padding: 16px;
      padding-top: 24px;
      .button {
        cursor: pointer;
        border: 2px solid rgba(255, 255, 255, 0.5);
        color: white;
        padding: 4px 32px;
        border-radius: 654px;
        margin-bottom: 8px;
        &.selected {
          border: 2px solid deepskyblue;
        }
      }
    }
  }
</style>
