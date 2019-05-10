<template>
  <div class="scrollable-container">
    <div
      :class="{ moving: drag.start, 'no-scroll-bar': noScrollBar }"
      class="scroll-bar-track"
      ref="scroll-bar-track">
      <div
        v-if="!noScrollBar"
        class="scroll-bar-thumb"
        ref="scroll-bar-thumb"
        @wheel.prevent
        @mousedown="handleScrollbarThumbClick"
        :style="scrollbarStyle.thumb">
      </div>
    </div>
    <div
      :class="{ 'no-scroll-bar': noScrollBar }"
      class="scroll-content flex-co">
      <div
        v-no-overscroll
        :style="scrollBoxStyle"
        class="scroll-box flex"
        ref="container">
        <div
          :style="contentWrapperStyle"
          class="content-wrapper">
          <slot :scroll-bar="!noScrollBar"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="less" src="./Scrollable.less" scoped></style>
