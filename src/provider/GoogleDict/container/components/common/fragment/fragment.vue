<template>
  <div class="fragment-box q-inline" v-if="props.fragment && props.fragment.length">
    <div
      class="q-inline fragment-item"
      v-for="(frag, index) in props.fragment"
      :key="frag.text + index"
    >
      <a
        v-if="frag.isEntryLink"
        class="entry-link"
        @click="handleEntryLinkClick($event, frag.text)"
        v-html="frag.text"
      />
      <div class="q-inline" v-else v-html="frag.text" />
    </div>
  </div>
</template>

<script lang="ts" src="./fragment.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
</style>
