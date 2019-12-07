<template>
  <div class="elevate-still-totem">
    <svg height="50" width="50">
      <circle cx="25" cy="25" r="24" fill="transparent" :stroke="color || 'deepskyblue'" />
      <circle
        cx="25"
        cy="25"
        r="15"
        fill="transparent"
        stroke-dasharray="4"
        :stroke="color || 'deepskyblue'"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateStillTotem extends Vue {

    @Prop()
    public color: string;

  }
</script>
