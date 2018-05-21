<template>
  <div
    class="scroll-container"
    :class="{ 'has-scroll-bar': !noScrollBar }">
    <div
      :class="{ moving: drag.start }"
      class="scroll-bar-track"
      v-if="!noScrollBar"
      ref="scroll-bar-track">
      <div
        class="scroll-bar-thumb"
        ref="scroll-bar-thumb"
        @mousewheel.prevent
        @mousedown="handleScrollbarThumbClick"
        :style="scrollbarStyle.thumb">
      </div>
    </div>
    <div
      class="scroll-content-box flex-co">
      <div
        class="scroll-content"
        ref="container"
        :style="{ 'margin-right': `${-scrollbarWidth}px` }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ScrollBar.ts"></script>

<style lang="less" src="./ScrollBar.less" scoped></style>
