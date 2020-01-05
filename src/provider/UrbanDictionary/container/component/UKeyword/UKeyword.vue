<template>
  <span
    ref="span"
    @click="handleClick"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    class="u-keyword"
  >
    {{ props.content }}
  </span>
</template>

<script lang="ts" src="./UKeyword.ts"></script>
<style lang="less" src="./UKeyword.less" scoped></style>
