<template>
  <div
    class="fragment-box inline"
    v-if="props.fragment && props.fragment.length"
  >
    <div
      class="inline fragment-item"
      v-for="frag in props.fragment"
      :key="frag.text"
    >
      <a
        v-if="frag.isEntryLink"
        class="entry-link"
        @click="handleEntryLinkClick($event, frag.text)"
        v-html="frag.text"
      />
      <div class="inline" v-else v-html="frag.text" />
    </div>
  </div>
</template>

<script lang="ts" src="./fragment.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
</style>
