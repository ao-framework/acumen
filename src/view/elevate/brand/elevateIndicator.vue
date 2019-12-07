<template>
  <div class="elevate-indicator">
    <elevate-row :breakPoint="1024">
      <elevate-column>
        <div class="label">{{label}}</div>
      </elevate-column>
      <elevate-column>
        <div class="value">{{value}}</div>
      </elevate-column>
    </elevate-row>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class Indicator extends Vue {

    @Prop()
    public label: string;

    @Prop()
    public value: string;

  }
</script>

<style lang="scss" scoped>
  .elevate-indicator {
    text-align: center;
    font-size: 12px;
    padding: 8px;
    border-radius: 2px;
    margin-bottom: 8px;
    background: #073a54;
    background: radial-gradient(
      circle,
      rgba(7, 69, 99, 0.2) 0%,
      rgba(7, 12, 19, 1) 100%
    );
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    }
    .label {
      color: rgba(255, 255, 255, 1);
      padding: 4px 16px;
    }
    .value {
      color: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 4px 16px;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    }
  }
</style>
