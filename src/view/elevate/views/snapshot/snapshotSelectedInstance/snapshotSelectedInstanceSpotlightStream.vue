<template>
  <div class="snapshot-selected-instance-spotlight-stream">
    <div @click="toggle()" class="header">
      <font-awesome-icon v-if="showing" icon="angle-up" />
      <font-awesome-icon v-if="!showing" icon="angle-down" />
      <span class="title">Spotlights {{instance.spotlights.length}}</span>
    </div>
    <elevate-scroll-list v-if="showing">
      <div class="spotlight" v-bind:key="index" v-for="(spotlight, index) of instance.spotlights">
        <div class="name">{{spotlight.name}}</div>
        <div class="diagram">
          <elevate-diagram-block :diagram="spotlight.data" />
        </div>
      </div>
    </elevate-scroll-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';

  @Component
  export default class SnapshotSelectedInstanceSpotlightStream extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public showing: boolean = this.instance.spotlights.length > 0;

    public toggle() {
      if (this.showing) {
        this.showing = false;
      } else {
        this.showing = true;
      }
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-selected-instance-spotlight-stream {
    width: 100%;
    .header {
      font-size: 22px;
      color: rgba(255, 255, 255, 0.1);
      padding: 16px;
      background: radial-gradient(circle, rgba(7, 69, 99, 0.8) 0%, #070c13 100%);
      border-top: 1px solid rgba(199, 179, 179, 0.05);
      cursor: pointer;
    }
    .spotlight {
      display: inline-block;
      background: radial-gradient(circle, rgba(7, 69, 99, 0.2) 0%, #070c13 100%);
      min-width: 400px;
      margin-right: 16px;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid deepskyblue;
      .name {
        text-align: center;
        color: rgba(255, 255, 255, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 654px;
        padding: 4px 16px;
        margin-bottom: 16px;
      }
    }
  }
</style>
