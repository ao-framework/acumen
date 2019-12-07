<template>
  <div @click="emitClick" class="elevate-button">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ElevateButton extends Vue {

    public emitClick() {
      this.$parent.$emit("click")
    }

  }
</script>
