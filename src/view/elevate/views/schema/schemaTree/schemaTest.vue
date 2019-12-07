<template>
  <div @click="open()" class="schema-test">
    <elevate-tree-node :collapsed="collapsed" :styles="treeStyles">
      <template v-slot:content>
        <div class="information">
          <div class="name">{{test.command}}</div>
          <div class="description">{{test.description}}</div>
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';
  import client from 'client/client';

  @Component
  export default class SchemaTest extends Vue {

    public client = client

    @Prop()
    public test: iSchemaTest;

    @Prop()
    public collapsed: boolean;

    public get treeStyles() {
      return {
        color: "rgba(255,255,255,0.6)",
        background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)",
        borderLeft: "3px solid deepskyblue",
      }
    }

    public open() {
      client.schemas.currentTest = this.test;
    }

  }
</script>

<style lang="scss" scoped>
  .schema-test {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
