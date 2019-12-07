<template>
  <div :class="{ 'contains-errors': containsErrors }" class="notifications">
    <div class="listing">
      <notification
        :notification="notification"
        v-bind:key="notification.id"
        v-for="(notification) of notifications.list"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from 'client/client';
  import Notification from "./notification.vue";

  @Component({
    components: {
      "notification": Notification
    }
  })
  export default class Notifications extends Vue {

    public notifications = client.notifications;

    public get containsErrors() {
      return this.notifications.list.filter(notification => notification.type === "error").length > 0;
    }
  }
</script>

<style lang="scss" scoped>
  .notifications {
    position: fixed;
    left: 10%;
    bottom: 75px;
    width: 50%;
    transition: 0.5s;
    max-height: calc(100% - 125px);
    overflow: auto;
    @media (max-width: 1000px) {
      width: 80%;
    }
  }
</style>
