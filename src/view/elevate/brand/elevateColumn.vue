<template>
  <div class="elevate-column">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ElevateColumn extends Vue { }
</script>

<style lang="scss" scoped>
  .elevate-column {
    box-sizing: border-box;
    &.full {
      width: 100%;
    }
    &.pad {
      padding: 0px 16px;
    }
    &.pad-right {
      padding-right: 16px;
    }
    &.pad-left {
      padding-left: 16px;
    }
  }
</style>
