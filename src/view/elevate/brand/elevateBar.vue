<template>
  <div :class="{ 'loading' : loading }" class="elevate-bar">
    <div class="logo">
      <elevate-logo />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from "client/client"

  @Component
  export default class ElevateBar extends Vue {

    public client = client;

    public get loading() {
      return this.client.loading;
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    opacity: 0.95;
    transition: 1s;
    background: radial-gradient(
      circle,
      rgba(7, 69, 99, 1) 0%,
      rgba(7, 12, 19, 1) 100%
    );
    &.loading {
      width: 100%;
      height: 100%;
      opacity: 0.5;
    }
    .logo {
      position: relative;
    }
  }
</style>
