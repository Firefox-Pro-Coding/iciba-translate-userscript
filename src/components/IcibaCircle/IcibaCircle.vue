<template>
  <div
    v-show="visible"
    :style="computedStyle"
    class="iciba-circle the-iciba-circle reset"
    @click="handleClick">
  </div>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>

<style lang="less" scoped>
  @import '~assets/styles/variables.less';
  @import '~assets/styles/hardreset.less';

  .reset {
    .hard-reset();
  }

  .iciba-circle.the-iciba-circle.reset {
    position: absolute;
    display: block;
    z-index: 10000;
    overflow: hidden;
    width: 22px;
    height: 22px;
    border: 1px solid @dark-border;
    border-radius: 100px;
    background: @iciba-circle-background;
    box-shadow: 0 0 5px @box-shadow-color;
    opacity: 0.7;
    transition: 0.1s ease opacity, 0.1s ease border, 0.1s ease background, 0.1s ease box-shadow;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      opacity: 1;
    }

    &:active {
      box-shadow: 0 0 5px @box-shadow-color, 0 0 3px @box-shadow-color inset;
      background: @iciba-circle-active-background;
    }
  }
</style>
