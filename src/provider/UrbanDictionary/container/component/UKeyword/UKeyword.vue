<template>
  <span
    ref="span"
    @click="handleClick"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    class="u-keyword">{{ content }}</span>
</template>

<script lang="ts" src="./UKeyWord.ts"></script>
<style lang="less" src="./UKeyWord.less" scoped></style>
