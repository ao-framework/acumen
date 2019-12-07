<template>
  <div class="snapshot-tree">
    <snapshot-suite
      v-if="entry.snapshot && entry.snapshot.suite"
      :collapsed="false"
      :suite="entry.snapshot.suite"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { EntryFile } from "client/entry/entryFile";
  import SnapshotSuite from './snapshotSuite.vue';

  @Component({
    components: {
      "snapshot-suite": SnapshotSuite
    }
  })
  export default class SnapshotTree extends Vue {

    @Prop()
    public entry: EntryFile

  }
</script>
