<template>
  <div class="snapshot-selected-instance-timeline">
    <div @click="toggle()" class="header">
      <font-awesome-icon v-if="showing" icon="angle-up" />
      <font-awesome-icon v-if="!showing" icon="angle-down" />
      <span class="title">Timeline</span>
    </div>
    <elevate-scroll-list v-if="showing">
      <div class="plot" v-bind:key="index" v-for="(plot, index) of items">
        <div class="label">{{plot.label}}</div>
        <div class="time">{{plot.time}}ms</div>
      </div>
    </elevate-scroll-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import { iSnapshotSpotlight } from 'contracts/snapshots/model/iSnapshotSpotlight';
  import { iSnapshotWarning } from 'contracts/snapshots/model/iSnapshotWarning';

  @Component
  export default class SnapshotSelectedInstanceTimeline extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance

    @Prop()
    public test: iSnapshotTest;

    public showing: boolean = true;

    public toggle() {
      if (this.showing) {
        this.showing = false;
      } else {
        this.showing = true;
      }
    }

    public testStart() {
      return {
        label: "@started",
        time: 0,
      }
    }

    public testEnd(time: number) {
      return {
        label: "@ended",
        time,
      }
    }

    public spotlight(spotlight: iSnapshotSpotlight, offset: number) {
      return {
        label: `@spotlight( ${spotlight.name} )`,
        time: (spotlight.time - offset)
      }
    }

    public warning(warning: iSnapshotWarning, offset: number) {
      return {
        label: `@warning( ${warning.message} )`,
        time: (warning.time - offset)
      }
    }

    public get items() {
      const items = [];
      const offset = this.instance.start;
      items.push(this.testStart())
      this.instance.spotlights.forEach(spotlight => {
        items.push(this.spotlight(spotlight, offset))
      })
      this.instance.warnings.forEach(warning => {
        items.push(this.warning(warning, offset))
      })
      items.push(this.testEnd(this.instance.time))
      return items.sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        } else {
          return -1;
        }
      })
    }

  }
</script>

<style lang="scss" scoped>
  .snapshot-selected-instance-timeline {
    .header {
      font-size: 22px;
      color: rgba(255, 255, 255, 0.1);
      padding: 16px;
      background: radial-gradient(circle, rgba(7, 69, 99, 0.8) 0%, #070c13 100%);
      border-top: 1px solid rgba(199, 179, 179, 0.05);
      cursor: pointer;
    }
    .plot {
      display: inline-block;
      background: radial-gradient(circle, rgba(7, 69, 99, 0.2) 0%, #070c13 100%);
      min-width: 400px;
      margin-right: 16px;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid deepskyblue;
      .label {
        text-align: center;
        color: rgba(255, 255, 255, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 654px;
        padding: 4px 16px;
        margin-bottom: 16px;
      }
      .time {
        text-align: center;
        color: rgba(255, 255, 255, 0.3);
        border-radius: 654px;
        padding: 4px 16px;
        margin-bottom: 16px;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
