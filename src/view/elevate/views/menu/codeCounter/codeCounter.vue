<template>
  <div class="code-counter">
    <h1>Search File Extensions</h1>
    <div class="field">
      <div class="label"></div>
      <input type="text" v-model="query" />
    </div>
    <div class="field">
      <div class="label"></div>
      <input type="text" v-model="directory" />
    </div>
    <div class="buttons">
      <div @click="doSearch()" class="button">Search</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class CodeCounter extends Vue {
    public query: string = "";
    public directory: string = "";
    public search: boolean = false;

    public doSearch() {

    }
  }
</script>

<style lang="scss" scoped>
  .code-counter {
  }
</style>
