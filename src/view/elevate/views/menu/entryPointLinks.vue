<template>
  <div>
    <div v-if="!client.loading" class="main">
      <elevate-card
        class="animated slideInDown"
        v-bind:key="key"
        v-for="(entry, key) in client.entries"
        :loading="entry.schemaLoading || entry.snapshotLoading || entry.coverageLoading"
      >
        <template v-slot:header>
          <elevate-path-name :path="entry.shortPath" />
        </template>
        <template v-slot:main>
          <div class="links">
            <elevate-row class="right" :breakPoint="1024">
              <elevate-column>
                <router-link class="entry-point-link" :to="`/schema/${entry.base64}`">Schema</router-link>
              </elevate-column>
              <elevate-column>
                <router-link class="entry-point-link" :to="`/snapshot/${entry.base64}`">Snapshot</router-link>
              </elevate-column>
              <elevate-column>
                <router-link class="entry-point-link" :to="`/coverage/${entry.base64}`">Coverage</router-link>
              </elevate-column>
            </elevate-row>
          </div>
        </template>
      </elevate-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import client from 'client/client';

  @Component
  export default class EntryPointLinks extends Vue {

    public client = client;

  }
</script>

<style lang="scss" scoped>
  .entry-point-link {
    display: block;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 654px;
    margin-bottom: 4px;
    margin-right: 8px;
    font-size: 12px;
  }
</style>
