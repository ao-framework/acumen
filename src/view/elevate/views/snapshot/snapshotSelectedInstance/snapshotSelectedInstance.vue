<template>
  <div class="snapshot-selected-instance">
    <div class="wrapper">
      <snapshot-selected-instance-bar :instance="instance" :test="test" />
      <div v-if="instance.type === 'failure'" class="error">
        <snapshot-test-instance-error-manager :instance="instance" :test="test" />
      </div>
      <snapshot-selected-instance-warning-stream :instance="instance" :test="test" />
      <div v-if="instance.args.length >= instance.spotlights.length" class="option-1">
        <snapshot-selected-instance-arguments-stream :instance="instance" :test="test" />
        <snapshot-selected-instance-spotlight-stream :instance="instance" :test="test" />
      </div>
      <div v-if="instance.args.length < instance.spotlights.length" class="option-1">
        <snapshot-selected-instance-spotlight-stream :instance="instance" :test="test" />
        <snapshot-selected-instance-arguments-stream :instance="instance" :test="test" />
      </div>
      <snapshot-selected-instance-timeline :instance="instance" :test="test" />
      <elevate-row v-if="false">
        <elevate-column>
          <elevate-code-editor v-if="test.hasFunction  && false" :code="test.functionCode" />
        </elevate-column>
        <elevate-column></elevate-column>
      </elevate-row>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { iSnapshotTest } from 'contracts/snapshots/model/iSnapshotTest';
  import { iSnapshotTestInstance } from 'contracts/snapshots/model/iSnapshotTestInstance';
  import SnapshotSelectedInstanceSpotlightStream from './snapshotSelectedInstanceSpotlightStream.vue';
  import SnapshotSelectedInstanceArgumentsStream from './snapshotSelectedInstanceArgumentsStream.vue';
  import SnapshotSelectedInstanceTimeline from './snapshotSelectedInstanceTimeline.vue';
  import SnapshotSelectedInstanceBar from './snapshotSelectedInstanceBar.vue';
  import SnapshotTestInstanceErrorManager from '../snapshotTree/snapshotTestInstance/snapshotTestInstanceErrorManager.vue';
  import SnapshotSelectedInstanceWarningStream from './snapshotSelectedInstanceWarningStream.vue';

  @Component({
    components: {
      "snapshot-selected-instance-bar": SnapshotSelectedInstanceBar,
      "snapshot-selected-instance-spotlight-stream": SnapshotSelectedInstanceSpotlightStream,
      "snapshot-selected-instance-arguments-stream": SnapshotSelectedInstanceArgumentsStream,
      "snapshot-selected-instance-timeline": SnapshotSelectedInstanceTimeline,
      "snapshot-test-instance-error-manager": SnapshotTestInstanceErrorManager,
      "snapshot-selected-instance-warning-stream": SnapshotSelectedInstanceWarningStream
    }
  })
  export default class SnapshotSelectedInstance extends Vue {

    @Prop()
    public instance: iSnapshotTestInstance;

    @Prop()
    public test: iSnapshotTest;

  }
</script>

<style lang="scss" scoped>
  .snapshot-selected-instance {
    .wrapper {
      width: 90%;
      margin: 0 auto;
    }
    .error {
      padding: 16px;
      background: radial-gradient(
        circle,
        rgba(255, 0, 0, 0.2) 0%,
        rgba(7, 12, 19, 1) 100%
      );
    }
  }
</style>
