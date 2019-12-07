<template>
  <div class="coverage-selected-file-bar">
    <div :title="path" class="title">{{name}}</div>
    <div class="right-buttons">
      <div @click="close()" class="button">
        <font-awesome-icon icon="times" size="lg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from 'client/client';
  import { iCoverageFile } from 'contracts/coverage/model/iCoverageFile';

  @Component
  export default class CoverageSelectedFileBar extends Vue {

    @Prop()
    public file: iCoverageFile

    public get path() {
      return this.file.sourcePath ? this.file.sourcePath : this.file.transpiledPath;
    }

    public get name() {
      return this.file.fileName;
    }

    public close() {
      client.coverage.currentFile = null;
    }

  }
</script>

<style lang="scss" scoped>
  .coverage-selected-file-bar {
    background: #000;
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    .title {
      color: rgba(255, 255, 255, 0.3);
      font-size: 22px;
      width: 100%;
      font-family: monospace;
    }
    .right-buttons {
      text-align: right;
      .button {
        color: rgba(255, 255, 255, 0.3);
        display: inline-block;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
</style>
