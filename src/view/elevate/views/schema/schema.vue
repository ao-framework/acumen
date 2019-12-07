<template>
  <div class="schema">
    <elevate-loader :loading="client.loading">Loading Schema</elevate-loader>
    <elevate-viewer
      v-if="client.loading === false && client.schemas.currentEntry"
      section="Schema"
      :path="client.schemas.currentEntry.shortPath"
      :panelOpen="!client.schemas.currentTest"
      :loading="client.schemas.currentEntry.schemaLoading"
    >
      <template v-slot:panel>
        <div class="panel-wrapper">
          <schema-tree v-if="client.schemas.currentEntry" :entry="client.schemas.currentEntry" />
        </div>
      </template>
      <template v-slot:content>
        <schema-selected-test v-if="client.schemas.currentTest" :test="client.schemas.currentTest" />
      </template>
    </elevate-viewer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from 'client/client';
  import SchemaSelectedTest from './schemaSelectedTest/schemaSelectedTest.vue';
  import SchemaTree from './schemaTree/schemaTree.vue';

  @Component({
    components: {
      "schema-selected-test": SchemaSelectedTest,
      "schema-tree": SchemaTree
    }
  })
  export default class Schema extends Vue {

    public client = client;

    public mounted() {
      if (this.client.loading) {
        this.client.on("load", () => {
          this.client.schemas.selectEntry(this.$route.params.entryPoint);
          this.client.schemas.getSchemaForEntry(this.client.schemas.currentEntry);
        })
      } else {
        this.client.schemas.selectEntry(this.$route.params.entryPoint);
        this.client.schemas.getSchemaForEntry(this.client.schemas.currentEntry);
      }
    }

  }
</script>

<style lang="scss" scoped>
  .schema {
    .panel-wrapper {
      margin: 0 auto;
      width: 80%;
      max-width: 1200px;
    }
  }
</style>
