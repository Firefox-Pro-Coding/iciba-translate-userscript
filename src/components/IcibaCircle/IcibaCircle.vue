<template>
  <transition name="circle">
    <div
      ref="circle"
      v-show="state.visible"
      :style="computedStyle"
      class="iciba-circle"
      @contextmenu.prevent
      @mouseover="m.handleSelfMouseover"
      @mouseup="m.handleSelfMouseUp"
    />
  </transition>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>
<style src="./IcibaCircle.less" lang="less" scoped></style>
