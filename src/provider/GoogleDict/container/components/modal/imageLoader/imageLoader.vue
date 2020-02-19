<template>
  <div
    class="image-loader flex justify-center items-center"
    :style="{
      height: `${Number(props.height) / 2}px`,
      width: `${Number(props.width) / 2}px`,
    }"
  >
    <span v-if="!state.data" class="placeholder">img loading</span>
    <img
      v-if="state.data"
      :style="{
        height: `${Number(props.height) / 2}px`,
        width: `${Number(props.width) / 2}px`,
      }"
      :src="state.data"
    >
  </div>
</template>

<script lang="ts" src="./imageLoader.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';

  .image-loader {
    background: none;

    > .placeholder {
      font-family: monospace;
      color: @main-level-2;
    }
  }
</style>
