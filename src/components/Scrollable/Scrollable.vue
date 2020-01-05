<template>
  <div class="scrollable-container">
    <div
      class="scroll-bar-track"
      :class="{
        moving: state.drag.start,
        'no-scroll-bar': state.noScrollBar,
      }"
      ref="scroll-bar-track"
    >
      <div
        class="scroll-bar-thumb"
        v-if="!state.noScrollBar"
        ref="scroll-bar-thumb"
        @wheel.prevent
        @mousedown="handleScrollbarThumbClick"
        :style="computedScrollBarStyle.thumb"
      />
    </div>
    <div
      :class="{
        'scroll-content flex-co': true,
        'no-scroll-bar': state.noScrollBar,
      }"
    >
      <div
        v-no-overscroll
        :style="scrollBoxStyle"
        class="scroll-box flex"
        @scroll="calcScrollbar"
        @mouseenter="calcScrollbar"
        ref="container"
      >
        <div
          :style="contentWrapperStyle"
          class="content-wrapper"
        >
          <slot :scroll-bar="!state.noScrollBar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="less" src="./Scrollable.less" scoped></style>
