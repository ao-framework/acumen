<template>
  <div class="elevate">
    <elevate-background></elevate-background>
    <elevate-content>
      <slot></slot>
    </elevate-content>
    <elevate-bar></elevate-bar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Elevate extends Vue { }
</script>

<style lang="scss" scoped>
  .elevate {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
