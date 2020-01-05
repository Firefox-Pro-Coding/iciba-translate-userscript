<template>
  <div class="foldable-box" :style="state.foldableStyle">
    <div ref="wrapper" class="foldable-wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" src="./foldable.ts"></script>
<style lang="less" src="./foldable.less" scoped></style>
