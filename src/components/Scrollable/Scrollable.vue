<template>
  <div class="scrollable relative flex">
    <div
      class="scroll-bar-track absolute"
      :class="{
        moving: state.drag.start,
        'no-scroll-bar': state.noScrollBar,
      }"
      ref="scroll-bar-track"
    >
      <div
        class="scroll-bar-thumb rounded-full flex justify-center absolute ease-in-out duration-100"
        v-if="!state.noScrollBar"
        ref="scroll-bar-thumb"
        @wheel.prevent
        @mousedown="handleScrollbarThumbClick"
        :style="computedScrollBarStyle.thumb"
      />
    </div>
    <div
      class="scroll-content flex-col flex-auto overflow-hidden"
      :class="{
        'no-scroll-bar': state.noScrollBar,
      }"
    >
      <div
        v-no-overscroll
        :style="scrollBoxStyle"
        class="scroll-box flex flex-auto"
        @scroll="calcScrollbar"
        @mouseenter="calcScrollbar"
        ref="container"
      >
        <div
          :style="contentWrapperStyle"
          class="w-full"
        >
          <slot :scroll-bar="!state.noScrollBar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Scrollable.ts"></script>
<style lang="sass" src="./Scrollable.sass" scoped></style>
