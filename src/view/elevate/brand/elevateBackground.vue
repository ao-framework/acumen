<template>
  <div class="elevate-background"></div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ElevateBackground extends Vue { }
</script>

<style lang="scss" scoped>
  .elevate-background {
    background: url("/images/nasa.jpg");
    background-attachment: fixed;
    background-size: cover;
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0%;
    overflow: hidden;
    width: 110%;
    height: 100%;
  }
</style>
