<template>
  <div class="elevate-totem">
    <svg height="50" width="50">
      <circle
        cx="25"
        cy="25"
        r="25"
        fill="transparent"
        stroke-dasharray="24"
        :stroke="color ||  'deepskyblue'"
      >
        <animate
          attributeType="XML"
          attributeName="r"
          values="25;20;15;10;7;15;20;25"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="25"
        cy="25"
        r="15"
        fill="transparent"
        stroke-dasharray="4"
        :stroke="color ||  'deepskyblue'"
      >
        <animate
          attributeType="XML"
          attributeName="r"
          values="15;13;10;8;4;8;10;12;15;20;25;20;15"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ElevateTotem extends Vue {

    @Prop()
    public color: string;

  }
</script>
