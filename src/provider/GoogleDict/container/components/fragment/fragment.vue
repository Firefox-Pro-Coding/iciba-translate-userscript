<template lang="icibahtml">
  <div class="fragment-box iciba-inline" v-if="fragment && fragment.length">
    <div class="iciba-inline fragment-item" v-for="(frag, index) in fragment" :key="index">
      <a
        v-if="frag.isEntryLink"
        class="entry-link"
        @click="handleEntryLinkClick(frag.text)"
        v-html="frag.text">
      </a>
      <div class="iciba-inline" v-else v-html="frag.text"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./fragment.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';
</style>
