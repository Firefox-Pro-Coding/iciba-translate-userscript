<template>
  <div
    v-show="visible"
    :style="internalStyle"
    class="iciba-circle"
    @click="handleClick">
  </div>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>

<style lang="less" scope>
  @import '~assets/styles/variables.less';

  .iciba-circle {
    position: absolute;
    display: block;
    z-index: 10000;
    overflow: hidden;
    width: 20px;
    height: 20px;
    border: 1px solid #555;
    border-radius: 100px;
    background: #ABD;
    box-shadow: 0 0 5px @box-shadow-color;
    opacity: 0.7;
    transition: 0.1s ease opacity, 0.1s ease border, 0.1s ease background, 0.1s ease box-shadow;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      opacity: 1;
    }

    &:active {
      border: 1px solid #353535;
      background: #90A2C4;
      box-shadow: 0 0 5px #999;
    }
  }
</style>
