<template>
  <span
    class="u-keyword relative"
    :ref="refs.span"
    @click="handleClick"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >{{ props.content.trim() }}</span>
</template>

<script lang="ts" src="./UKeyword.ts"></script>
