<template>
  <div class="iciba-size-helper"></div>
</template>

<script lang="ts" src="./SizeHelper.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .iciba-size-helper {
    .hard-reset();

    position: fixed;
    top: auto;
    left: auto;
    right: 0;
    bottom: 0;
    height: 0;
    width: 0;
    overflow: hidden;
  }
</style>
