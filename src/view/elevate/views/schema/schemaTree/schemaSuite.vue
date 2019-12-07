<template>
  <div class="schema-suite">
    <elevate-tree-node
      :collapsed="collapsed"
      :styles="treeStyles"
      :hasTotem="true"
      totemColor="deepskyblue"
    >
      <template v-slot:content>
        <div class="information">
          <div class="name">{{suite.name}}</div>
          <div class="description">{{suite.description}}</div>
        </div>
      </template>
      <template v-slot:children>
        <div class="controller">
          <schema-controller :collapsed="true" :controller="suite.controller" />
        </div>
        <div class="tests">
          <schema-test
            :collapsed="true"
            :test="test"
            v-bind:key="key"
            v-for="(test, key) in suite.tests"
          />
        </div>
        <div class="suites">
          <schema-suite
            :collapsed="true"
            :suite="suite"
            v-bind:key="key"
            v-for="(suite, key) in suite.suites"
          />
        </div>
      </template>
    </elevate-tree-node>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSchemaSuite } from 'contracts/schema/model/iSchemaSuite';
  import SchemaTest from './schemaTest.vue';
  import SchemaController from './schemaController.vue';

  @Component({
    components: {
      "schema-controller": SchemaController,
      "schema-test": SchemaTest
    }
  })
  export default class SchemaSuite extends Vue {

    @Prop()
    public suite: iSchemaSuite;

    @Prop()
    public collapsed: boolean;

    public treeStyles = {
      color: "rgba(255,255,255,0.6)",
      background: "radial-gradient(circle,rgba(7, 69, 99, 0.1) 0%,rgba(7, 12, 19, 1) 100%)"
    }

  }
</script>

<style lang="scss" scoped>
  .schema-suite {
    .information {
      padding: 16px;
      .description {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
</style>
