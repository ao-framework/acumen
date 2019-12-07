<template>
  <div class="schema-selected-test">
    <div class="wrapper">
      <schema-selected-test-bar :test="test" />
      <div class="name">{{test.command}}</div>
      <div v-if="test.hasFunction" class="code">
        <elevate-code-editor :code="test.functionCode" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import client from 'client/client';
  import { iSchemaTest } from 'contracts/schema/model/iSchemaTest';
  import SchemaSelectedTestBar from './schemaSelectedTestBar.vue';

  @Component({
    components: {
      "schema-selected-test-bar": SchemaSelectedTestBar
    }
  })
  export default class SchemaSelectedTest extends Vue {

    public client = client;

    @Prop()
    public test: iSchemaTest;

  }
</script>

<style lang="scss" scoped>
  .schema-selected-test {
    .wrapper {
      margin: 0 auto;
      width: 80%;
      max-width: 1200px;
    }
  }
</style>
