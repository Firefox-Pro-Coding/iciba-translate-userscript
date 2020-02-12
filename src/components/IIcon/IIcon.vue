<template>
  <div
    class="i-icon flex flex-center"
    :style="{
      height: computedSize,
      width: computedSize,
    }"
  >
    <img class="svg-img" :src="svgUrl" alt="">
  </div>
</template>
<script lang="ts" src="./IIcon.ts"></script>
<style lang="less" src="./IIcon.less" scoped></style>
