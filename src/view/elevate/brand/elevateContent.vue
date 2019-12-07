<template>
  <div class="elevate-content">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ElevateContent extends Vue { }
</script>

<style lang="scss" scoped>
  .elevate-content {
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
    width: 100%;
    height: calc(100% - 75px);
    .container {
      margin-bottom: 300px;
    }
  }
</style>
