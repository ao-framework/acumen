<template>
  <div class="schema-tree">
    <schema-suite v-if="entry.schema" :collapsed="false" :suite="entry.schema.suite" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { EntryFile } from 'client/entry/entryFile';
  import SchemaSuite from './schemaSuite.vue';

  @Component({
    components: {
      "schema-suite": SchemaSuite
    }
  })
  export default class SchemaTree extends Vue {

    @Prop()
    public entry: EntryFile

  }
</script>
