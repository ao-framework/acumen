<template>
  <div class="app">
    <elevate>
      <router-view />
      <notifications />
    </elevate>
    <elevate-socket-death />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Notifications from './views/notifications/notifications.vue';

  @Component({
    components: {
      "notifications": Notifications
    }
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
  @import "../../../node_modules/animate.css/animate.css";
  @import "../../../node_modules/codemirror/lib/codemirror.css";
  @import "./brand/elevateCodeEditor/elevateTheme.css";
  html {
    overflow-x: hidden;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: "Montserrat", sans-serif;
    background-attachment: fixed;
    background-size: cover;
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
