<template>
  <div :class="notificationClasses" class="notification animated">
    <div class="top-section">
      <elevate-row>
        <elevate-column>
          <div @click="close()" class="close-button">
            <font-awesome-icon icon="times" />
          </div>
        </elevate-column>
      </elevate-row>
    </div>
    <div class="content-section">
      <elevate-row :breakPoint="654">
        <elevate-column class="pad">
          <elevate-totem color="white"></elevate-totem>
        </elevate-column>
        <elevate-column class="pad full">
          <div class="information">
            <div class="title">{{notification.title}}</div>
            <div v-if="!isError" class="content">{{notification.content}}</div>
            <div v-if="isError" class="error-viewer">
              <div
                class="line"
                v-bind:key="index"
                v-for="(line, index) of notification.error"
              >{{line}}</div>
            </div>
          </div>
        </elevate-column>
      </elevate-row>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Notification as NotificationModel } from "client/notifications/notification"

  @Component
  export default class Notification extends Vue {

    @Prop()
    public notification: NotificationModel

    public close() {
      this.notification.remove();
    }

    public get notificationClasses() {
      return {
        warning: this.notification.type === "warning",
        error: this.notification.type === "error",
        info: this.notification.type === "info",
        zoomIn: this.notification.markedForRemoval === false,
        zoomOut: this.notification.markedForRemoval === true,
      }
    }

    public get isError() {
      return this.notification.type === "error" && Array.isArray(this.notification.error);
    }

  }
</script>

<style lang="scss" scoped>
  .notification {
    color: white;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    .top-section {
      margin-bottom: 16px;
    }
    .close-button {
      border-radius: 654px;
      width: 75px;
      height: 18px;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      padding: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: pointer;
      &:hover {
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
          0 15px 12px rgba(0, 0, 0, 0.22);
      }
    }
    .information {
      width: 100%;
      overflow: auto;
    }
    .error-viewer {
      width: 100%;
      overflow: auto;
      .line {
        font-family: monospace;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 16px;
        color: white;
        margin-left: 16px;
        display: inline-block;
        word-break: break-word;
        &:first-child {
          margin-left: 0px;
        }
      }
    }
    &.warning {
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.2) 0%,
        rgba(7, 12, 19, 1) 100%
      );
    }
    &.info {
      background: radial-gradient(
        circle,
        rgba(7, 69, 99, 0.2) 0%,
        rgba(7, 12, 19, 1) 100%
      );
    }
    &.error {
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.2) 0%,
        rgba(7, 12, 19, 1) 100%
      );
    }
  }
</style>
