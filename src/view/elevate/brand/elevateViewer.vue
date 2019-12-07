<template>
  <div class="elevate-viewer animated slideInDown">
    <div class="header">
      <div class="title">
        <div class="section">{{section}}</div>
        <div class="path">{{path}}</div>
      </div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div :class="{'open': panelOpen}" class="panel">
      <slot name="panel"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <div v-if="loading" class="loader animated zoomIn">
      <elevate-loader :loading="true"></elevate-loader>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateViewer extends Vue {

    @Prop()
    public panelOpen: boolean;

    @Prop()
    public loading: boolean;

    @Prop()
    public section: string;

    @Prop()
    public path: string;

  }
</script>

<style lang="scss" scoped>
  $headerHeight: 50px;
  $footerHeight: 0px;
  $combine: $headerHeight + $footerHeight;
  $background: rgba(0, 0, 0, 0.2);
  .elevate-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $background;
    overflow: hidden;
    .panel {
      position: absolute;
      top: $headerHeight;
      right: -100%;
      width: 100%;
      height: calc(100% - #{$combine});
      background: $background;
      transition: 1s;
      overflow-y: scroll;
      &.open {
        right: 0%;
      }
    }
    .header {
      color: white;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: $headerHeight;
      background: radial-gradient(
        circle,
        rgba(7, 69, 99, 1) 0%,
        rgba(7, 12, 19, 1) 100%
      );
      .title {
        display: flex;
        align-items: center;
        .section {
          margin-top: 4px;
          margin-left: 12px;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.2);
          @media (max-width: 500px) {
            display: none;
          }
        }
        .path {
          margin-top: 6px;
          margin-left: 12px;
          line-height: 30px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          font-family: monospace;
        }
      }
    }
    .content {
      position: absolute;
      top: $headerHeight;
      left: 0;
      width: 100%;
      height: calc(100% - #{$combine});
      background: $background;
      overflow-y: scroll;
    }
    .loader {
      position: absolute;
      top: 40%;
      left: 0;
      right: 0;
    }
    .footer {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: $footerHeight;
      background: black;
    }
  }
</style>
