<template>
  <div class="menu">
    <elevate-loader :loading="client.loading">Client is loading</elevate-loader>
    <div class="wrapper">
      <entry-point-links />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from "client/client";
  import EntryPointLinks from './entryPointLinks.vue';

  @Component({
    components: {
      "entry-point-links": EntryPointLinks,
    }
  })
  export default class Menu extends Vue {

    public client = client

  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 80%;
    margin: 0 auto;
  }
</style>
