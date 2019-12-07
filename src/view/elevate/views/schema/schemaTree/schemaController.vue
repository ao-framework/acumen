<template>
  <div @click="open()" class="schema-controller">
    <elevate-tree-node :styles="treeStyles" backgroundColor="black">
      <template v-slot:content>
        <div class="information">
          <div class="name">{{controller.command}}</div>
          <div class="description">{{controller.description}}</div>
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from 'client/client';
  import { iSchemaController } from 'contracts/schema/model/iSchemaController';
  import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';

  @Component
  export default class SchemaController extends Vue {

    @Prop()
    public controller: iSchemaController;

    public get treeStyles() {
      return {
        borderLeft: "3px solid deepskyblue",
        color: "rgba(255,255,255,0.6)",
        background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)"
      }
    }

    public open() {
      client.schemas.currentTest = <iSchemaTest>this.controller;
    }

  }
</script>

<style lang="scss" scoped>
  .schema-controller {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
