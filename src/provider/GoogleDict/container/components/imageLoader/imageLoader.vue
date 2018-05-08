<template lang="icibahtml">
  <img
    :style="{
      height: `${Number(height) / 2 }px`,
      width: `${Number(width) / 2 }px`,
    }"
    :src="data">
</template>

<script lang="ts" src="./imageLoader.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';
</style>
