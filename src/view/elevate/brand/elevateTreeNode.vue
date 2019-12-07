<template>
  <div
    :class="{ 'clickable' : hasSlot('children') }"
    class="elevate-tree-node animated slideInDown"
  >
    <div @click="toggle()" :style="styles" class="content-box">
      <elevate-row :breakPoint="1024">
        <elevate-column v-if="hasTotem">
          <div class="totem">
            <elevate-still-totem :color="totemColor" />
          </div>
        </elevate-column>
        <elevate-column class="full">
          <div class="content">
            <slot name="content"></slot>
          </div>
        </elevate-column>
        <elevate-column v-if="hasSlot('children')" class="full">
          <div class="buttons">
            <div class="button">
              <font-awesome-icon v-if="!loadChildren" icon="angle-down" size="2x" />
              <font-awesome-icon v-if="loadChildren" icon="angle-up" size="2x" />
            </div>
          </div>
        </elevate-column>
      </elevate-row>
    </div>
    <div v-if="loadChildren" class="children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateTreeNode extends Vue {

    @Prop()
    public styles: object;

    @Prop()
    public hasTotem: boolean;

    @Prop()
    public totemColor: string;

    @Prop()
    public collapsed: boolean;

    public showingChildren: boolean = !this.collapsed;

    public get loadChildren() {
      return this.showingChildren === true;
    }

    public hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    }

    public toggle() {
      if (this.hasSlot("children") && this.showingChildren) {
        this.showingChildren = false;
      } else {
        this.showingChildren = true;
      }
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-tree-node {
    position: relative;
    color: white;
    margin-bottom: 16px;
    .content-box {
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      .totem {
        margin-right: 16px;
      }
      .content {
        width: 100%;
      }
      .buttons {
        padding: 8px;
        color: rgba(255, 255, 255, 0.1);
        text-align: right;
      }
    }
    .children {
      margin-left: 32px;
      margin-top: 16px;
      @media (max-width: 760px) {
        margin-left: 2px;
      }
    }
  }
</style>
