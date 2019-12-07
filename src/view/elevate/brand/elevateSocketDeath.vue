<template>
  <div v-if="!client.online" class="elevate-socket-death">Connection has been disconnected.</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from 'client/client';

  @Component
  export default class ElevateSocketDeath extends Vue {

    public client = client

  }
</script>

<style lang="scss" scoped>
  .elevate-socket-death {
    position: absolute;
    top: 90px;
    left: 0px;
    text-align: center;
    font-size: 22px;
    width: 100%;
    padding: 16px;
    color: white;
    background: radial-gradient(circle, rgba(255, 0, 0, 1) 50%, #070c13 100%);
  }
</style>
