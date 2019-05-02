<template>
  <div
    :style="{
      height: `${computedSize}`,
      width: `${computedSize}`,
    }"
    class="i-icon flex flex-center"
    :innerHTML.prop="svgContent">
  </div>
</template>

<script lang="ts" src="./IIcon.ts"></script>
<style lang="less" src="./IIcon.less" scoped></style>
