<template>
  <div class="coverage-directory">
    <elevate-tree-node
      :collapsed="collapsed"
      :styles="treeStyles"
      :showTotem="true"
      totemColor="deepskyblue"
    >
      <template v-slot:content>
        <div class="information">
          <div class="name">/ {{directory.name}}</div>
        </div>
      </template>
      <template v-slot:children>
        <div class="directories">
          <coverage-directory
            :collapsed="true"
            :directory="directory"
            v-bind:key="key"
            v-for="(directory, key) in directory.directories"
          />
        </div>
        <div class="files">
          <coverage-file :file="file" v-bind:key="key" v-for="(file, key) in directory.files" />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iCoverageDirectory } from 'contracts/coverage/model/iCoverageDirectory';
  import CoverageFile from './coverageFile.vue';

  @Component({
    components: {
      "coverage-file": CoverageFile
    }
  })
  export default class CoverageDirectory extends Vue {

    @Prop()
    directory: iCoverageDirectory;

    @Prop()
    collapsed: boolean;

    public treeStyles = {
      color: "rgba(255,255,255,0.6)",
      background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)"
    }

  }
</script>

<style lang="scss" scoped>
  .coverage-directory {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
