<template>
  <div :title="path" class="elevate-path-name">{{pathName}}</div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { dragScroll } from './elevateScrollList/dragScroll';

  @Component
  export default class ElevatePathName extends Vue {

    @Prop()
    public path: string;

    public get pathName() {
      return this.path;
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-path-name {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
