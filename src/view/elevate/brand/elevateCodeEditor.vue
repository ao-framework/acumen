<template>
  <div class="elevate-code-editor">
    <div class="editor"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import codemirror from "codemirror";
  import "codemirror/mode/javascript/javascript.js";

  @Component
  export default class ElevateCodeEditor extends Vue {

    @Prop()
    public type: string;

    @Prop()
    public code: string;

    @Prop()
    public selections: any[]

    public setSelections(cm) {
      if (Array.isArray(this.selections))
        if (this.selections.length > 0) {
          cm.getDoc().setSelections(this.selections);
        }
    }

    public mounted() {
      const c = codemirror(<HTMLElement>this.$el.querySelector(".editor"), {
        value: this.code,
        lineNumbers: true,
        mode: this.type ? (this.type === "ts" ? "typescript" : "javascript") : "javascript",
        readOnly: "nocursor",
        theme: "elevate",
        viewportMargin: Infinity,
      })
      this.setSelections(c);
      this.$watch("selections", () => this.setSelections(c))
      this.$watch("code", () => c.setValue(this.code));
    }

  }
</script>

<style lang="scss" scoped>
  .elevate-code-editor {
    color: white;
    padding: 16px;
    background: radial-gradient(
      circle,
      rgba(7, 69, 99, 0.1) 0%,
      rgba(7, 12, 19, 1) 100%
    );
    .editor {
      background: radial-gradient(
        circle,
        rgba(7, 69, 99, 0.1) 0%,
        rgba(7, 12, 19, 1) 100%
      );
    }
  }
</style>
