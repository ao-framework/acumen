<template>
  <div class="elevate-card">
    <div v-if="hasSlot('header')" class="header">
      <elevate-row class="left">
        <elevate-column class="pad-right">
          <elevate-still-totem />
        </elevate-column>
        <elevate-column class="full">
          <div class="header-content">
            <slot name="header" />
          </div>
        </elevate-column>
      </elevate-row>
    </div>
    <div class="main">
      <slot name="main" />
    </div>
    <div v-if="hasSlot('footer')" class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateCard extends Vue {

    @Prop()
    public loading: boolean;

    public hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-card {
    color: white;
    margin-bottom: 16px;
    border-radius: 8px;
    background: radial-gradient(
      circle,
      rgba(7, 69, 99, 0.2) 0%,
      rgba(7, 12, 19, 1) 100%
    );
    overflow: hidden;
    .header {
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      .header-content {
        width: 100%;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 16px;
      }
    }
    .main {
      padding: 16px;
      font-size: 16px;
    }
    .footer {
      padding: 16px;
      font-size: 12px;
    }
  }
</style>
