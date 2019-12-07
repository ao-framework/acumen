<template>
  <div class="schema-selected-test-bar">
    <div class="title">{{name}}</div>
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
  import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';

  @Component
  export default class SchemaSelectedTestBar extends Vue {

    @Prop()
    public test: iSchemaTest;

    public get name() {
      const tokens = [];
      return this.test.breadCrumbs.join(" > ")
    }

    public close() {
      client.schemas.currentTest = null;
    }

  }
</script>

<style lang="scss" scoped>
  .schema-selected-test-bar {
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
