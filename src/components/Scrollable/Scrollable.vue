<template>
  <div
    class="scroll-container"
    :class="{ 'no-scroll-bar': noScrollBar }">
    <div
      :class="{ moving: drag.start, 'no-scroll-bar': noScrollBar }"
      class="scroll-bar-track"
      ref="scroll-bar-track">
      <div
        v-if="!noScrollBar"
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
        @wheel="handleScroll"
        class="scroll-content flex"
        ref="container"
        :style="{ 'margin-right': `${-scrollbarWidth}px` }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="less" src="./Scrollable.less" scoped></style>
