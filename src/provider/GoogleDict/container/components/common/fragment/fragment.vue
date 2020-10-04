<template>
  <div
    class="fragment-box inline"
    v-if="props.fragment && props.fragment.length"
  >
    <div
      class="inline fragment-item"
      v-for="(frag, fIndex) in props.fragment"
      :key="fIndex"
    >
      <a
        v-if="frag.isEntryLink"
        class="text-link cursor-pointer"
        @click="handleEntryLinkClick($event, frag.text)"
        v-html="frag.text"
      />
      <div class="inline" v-else v-html="frag.text" />
    </div>
  </div>
</template>

<script lang="ts" src="./fragment.ts"></script>
