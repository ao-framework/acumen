<template>
  <div class="coverage-flat-directory">
    <div class="search">
      <input type="text" placeholder="Search" v-model="query" />
    </div>
    <coverage-file :file="file" v-bind:key="key" v-for="(file, key) in files" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';
  import { iCoverageDirectory } from 'contracts/coverage/model/iCoverageDirectory';
  import CoverageFile from './coverageFile.vue';

  @Component({
    components: {
      "coverage-file": CoverageFile
    }
  })
  export default class CoverageFlatDirectory extends Vue {

    @Prop()
    public directory: iCoverageDirectory;

    public query: string = ""

    public get files() {
      const files = [];
      function fixDirectory(directory: iCoverageDirectory) {
        directory.files.forEach(file => files.push(file))
        directory.directories.forEach(dir => fixDirectory(dir));
      }
      fixDirectory(this.directory)
      return files.sort((a, b) => {
        return a.coverage ? -1 : 1
      }).filter((file: iCoverageFile) => {
        if (this.query === "") {
          return true
        } else {
          if (file.fileName.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        }
      })
    }

  }
</script>

<style lang="scss" scoped>
  .coverage-flat-directory {
    .search {
      padding: 16px 0px;
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 16px 32px;
        border-radius: 654px;
        border: none;
        background: rgba(255, 255, 255, 0.05);
        color: white;
        font-family: inherit;
        outline: none;
      }
    }
  }
</style>
