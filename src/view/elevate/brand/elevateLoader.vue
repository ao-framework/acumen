<template>
  <div v-if="loading" class="elevate-loader animated zoomIn">
    <div class="loading">
      <div class="icon">
        <elevate-totem />
      </div>
      <div v-if="hasSlot()" class="text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateLoader extends Vue {

    @Prop()
    public loading: boolean;

    public hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-loader {
    margin-bottom: 16px;
    margin-top: 16px;
    border-radius: 4px;
    .loading {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      .text {
        margin-left: 16px;
      }
    }
  }
</style>
