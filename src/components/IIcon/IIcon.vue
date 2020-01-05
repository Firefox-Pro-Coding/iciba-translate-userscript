<template>
  <div
    class="i-icon flex flex-center"
    :style="{
      height: computedSize,
      width: computedSize,
    }"
    :innerHTML.prop="svgContent"
  />
</template>
<script lang="ts" src="./IIcon.ts"></script>
<style lang="less" src="./IIcon.less" scoped></style>
