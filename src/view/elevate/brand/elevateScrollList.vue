<template>
  <div class="elevate-scroll-list">
    <div class="container">
      <slot></slot>
    </div>
    <div class="left-border"></div>
    <div class="right-border"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { dragScroll } from './elevateScrollList/dragScroll';

  @Component
  export default class ElevateScrollList extends Vue {

    public broken: boolean = false;

    public mounted() {
      this.$nextTick(() => {
        dragScroll(<HTMLElement>this.$el.querySelector(".container"))
      })
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-scroll-list {
    position: relative;
    .container {
      display: flex;
      overflow: hidden;
      padding: 16px 64px;
      background: radial-gradient(circle, rgba(7, 69, 99, 0.5) 0%, #070c13 100%);
      min-height: 100px;
    }
    .left-border {
      position: absolute;
      left: 0px;
      top: 0px;
      height: calc(100% - 48px);
      padding: 24px 16px;
      background: linear-gradient(to left, rgba(7, 69, 99, 0) 0%, #070c13 100%);
      color: rgba(255, 255, 255, 0.1);
    }
    .right-border {
      position: absolute;
      right: 0px;
      top: 0px;
      height: calc(100% - 48px);
      padding: 24px 16px;
      background: rgba(0, 0, 0, 0.5);
      background: linear-gradient(to right, rgba(7, 69, 99, 0) 0%, #070c13 100%);
      color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
