<template>
  <div
    :style="{
      height: `${Number(height) / 2}px`,
      width: `${Number(width) / 2}px`,
    }"
    class="image-loader q-flex">
    <span v-if="!data" class="placeholder">img loading</span>
    <img
      v-if="data"
      :style="{
        height: `${Number(height) / 2}px`,
        width: `${Number(width) / 2}px`,
      }"
      :src="data" />
  </div>
</template>

<script lang="ts" src="./imageLoader.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .image-loader {
    justify-content: center;
    align-items: center;
    background: none;

    > .placeholder {
      font-family: monospace;
      color: @main-level-2;
    }
  }
</style>
