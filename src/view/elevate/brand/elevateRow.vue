<template>
  <div :class="rowClasses" class="elevate-row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateRow extends Vue {

    @Prop()
    public breakPoint: number;

    public windowSize: number = window.innerWidth;

    public get rowClasses() {
      return {
        break: this.breakPoint ? this.windowSize < this.breakPoint : false,
      }
    }

    public mounted() {
      window.addEventListener("resize", this.setSize);
    }

    public setSize() {
      this.windowSize = window.innerWidth
    }

    public destroy() {
      window.removeEventListener("resize", this.setSize);
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-row {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    width: 100%;
    &.justify {
      justify-content: space-evenly;
    }
    &.left {
      justify-content: flex-start;
    }
    &.right {
      justify-content: flex-end;
    }
    &.center {
      align-content: center;
    }
    &.break {
      display: block;
    }
  }
</style>
