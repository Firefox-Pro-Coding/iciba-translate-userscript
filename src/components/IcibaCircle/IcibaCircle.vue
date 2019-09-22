<template>
  <transition name="circle">
    <div
      v-show="visible"
      :style="computedStyle"
      class="iciba-circle"
      @contextmenu.prevent
      @mouseover="handleSelfMouseover"
      @mouseup="handleSelfMouseUp">
    </div>
  </transition>
</template>

<script lang="ts" src="./IcibaCircle.ts"></script>
<style src="./IcibaCircle.less" lang="less" scoped></style>
