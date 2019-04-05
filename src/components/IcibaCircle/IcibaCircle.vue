<template>
  <div
    v-show="visible"
    :style="computedStyle"
    class="iciba-circle"
    @click="handleClick">
  </div>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>
<style src="./IcibaCircle.less" lang="less" scoped></style>
