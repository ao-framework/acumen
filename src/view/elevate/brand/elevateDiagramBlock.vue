<template>
  <div class="elevate-diagram-block">
    <div class="info">
      <span class="key" v-if="indexKey">{{indexKey|| "#"}}:</span>
      <span class="type">
        <span class="token">{{diagram.instanceOf}}</span>
        <span v-if="typeof diagram.count === 'number'" class="count">({{diagram.count}})</span>
      </span>
      <span class="value" v-if="diagram.value !== undefined">= {{diagram.value}}</span>
      <span v-if="hasChildren">
        <span class="token">{</span>
        <span v-if="collapsed" @click="collapsed = false" class="button">[+]</span>
        <span v-if="!collapsed" @click="collapsed = true" class="button">[-]</span>
      </span>
    </div>
    <div v-if="hasChildren && collapsed === false" class="children">
      <elevate-diagram-block
        :diagram="diagram"
        :indexKey="index"
        v-bind:key="index"
        v-for="(diagram, index) in diagram.children"
      />
    </div>
    <span v-if="hasChildren">}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iVariableDiagram } from "../../../contracts/base/iVariableDiagram"

  @Component
  export default class ElevateDiagramBlock extends Vue {

    public collapsed: boolean = true;

    @Prop()
    public diagram: iVariableDiagram;

    @Prop()
    public indexKey: string;

    public get hasChildren() {
      return typeof this.diagram.children === "object" && this.diagram.children !== null;
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-diagram-block {
    font-family: monospace;
    color: white;
    line-height: 20px;
    .button {
      color: #545e74;
      transition: 0.5s;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
    .count {
      color: #545e74;
    }
    .type {
      color: deepskyblue;
      font-style: italic;
      font-weight: bold;
    }
    .key {
      color: #7fc1ec;
    }
    .value {
      color: #00ced1;
    }
    .children {
      margin-left: 16px;
    }
  }
</style>
